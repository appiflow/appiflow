import gradio as gr

import pandas as pd

import os
from appiflow_core.config import get_template_path
from appiflow_core.service import usecases
from appiflow_core.models import usecases as usecase_model


def get_usecases() -> pd.DataFrame:
    template_path = get_template_path() + os.sep + "all.json" 
    df = pd.read_json(template_path)
    df.style.set_table_styles([{"selector":"tbody tr:nth-child(even)","props":[("background-color","green")]}])
    df.style.relabel_index(["UseCase Id", "Name", "Description"], axis='columns')
    return df

usecase_df = get_usecases()



def generate_code(df_state):
    usc: usecases.UsecaseService = usecases.UsecaseService()
    uscgr: usecase_model.UsecaseGenerateRequest = usecase_model.UsecaseGenerateRequest
    ucsin: usecase_model.UsecaseInput = usecase_model.UsecaseInput
    ucsin.usecase_id = "2"
    uscgr.usecaseInput  = ucsin
    resp = usc.generate(df_state, uscgr)
    yield resp
    


with gr.Blocks(theme=gr.themes.Soft()) as demo:
    title = gr.HTML("<h1>Code Generator</h1>")
    df_state = gr.State([])
    
    def on_select(board, evt: gr.SelectData, df_state):
        print('1')
        print(evt.index[0])
        selected_usecase_id = None
        selected_row = usecase_df.iloc[evt.index[0]]
        print(selected_row['usecase_id'])
        
        df_state = selected_row['usecase_id']
        return df_state
    
    output_df = gr.Dataframe(value=usecase_df, headers="class", label="Select a Usecase",type="pandas", visible=True, interactive=False)
    output_df.select(on_select, [output_df, df_state], [df_state])
    with gr.Row():
        generate_button = gr.Button("Generate Code", variant = 'primary', scale=0)
    
    with gr.Row():
        #title = gr.HTML("<h2>Code</h2>")
        code_text = gr.Textbox(label="Code", interactive=False, min_width=200, lines = 10, show_copy_button = True)
    
    generate_button.click(fn=generate_code, inputs=[df_state], outputs=code_text)

demo.launch()
import os
 
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))


def get_template_path():
    remove_path =  'appiflow_core' + os.sep + 'config'
    t_path = ROOT_DIR.replace(remove_path, '')

    t_path = t_path +  'appiflow_resources' + os.sep + 'templates'
    return t_path


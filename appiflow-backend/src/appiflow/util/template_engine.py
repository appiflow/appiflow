import jinja2
from jinja2 import Environment, FileSystemLoader

def apply_template1():
    environment = jinja2.Environment()
    template = environment.from_string("Hello, {{ name }} from template!")
    print(template.render(name=" new World"))
    
def apply_template2():   
    environment = Environment(loader=FileSystemLoader("templates/"))
    template = environment.get_template("message.java")
    map = {"name": "Order",  "score": 90}
    content = template.render(map)
    print(f"content from template ",{content})
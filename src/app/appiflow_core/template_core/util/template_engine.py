import jinja2
from jinja2 import Environment, FileSystemLoader
from appiflow_core.template_core.util import logger

log = logger.get_logger(__name__)
   
def apply_template(template_file_name : str, template_path : str, param_map : dict) -> str:
    """Applies a template with parameters to generate a templatized output

    Args:
        template_file_name (str): Name of the template file to be applied
        template_path (str): Location of the template file
        param_map (dict): Map of key/values which are used by the template file

    Returns:
        str: Content generated by replacing keys with values
    """
    environment = Environment(loader=FileSystemLoader(template_path))
    template = environment.get_template(template_file_name)
    content = template.render(param_map)
    return content
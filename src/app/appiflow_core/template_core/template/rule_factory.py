from appiflow_core.template_core.template.copy_all_files_rule_handler import CopyAllFilesRuleHandler
from appiflow_core.template_core.template.copy_file_rule_handler import CopyFileRuleHandler
from appiflow_core.template_core.template.create_folder_rule_handler import CreateFolderRuleHandler
from appiflow_core.template_core.template.create_content_rule_handler import CreateContentRuleHandler
from appiflow_core.template_core.util.constants import Constants


class RuleHandlerFactory:
    RULES_MAPPING = {
        Constants.COPY_SINGLE_FILE.value : CopyFileRuleHandler,
        Constants.COPY_ALL_FILES.value : CopyAllFilesRuleHandler,
        Constants.CREATE_FOLDER.value : CreateFolderRuleHandler,
        Constants.CREATE_CONTENT.value : CreateContentRuleHandler
        # Add more rules as needed
    }

    @staticmethod
    def get_rule(rule_type : str):
        handler_class = RuleHandlerFactory.RULES_MAPPING.get(rule_type)
        print(handler_class)
        if handler_class:
            return handler_class()
        else:
            raise ValueError(f"Unsupported rule: {rule_type}")
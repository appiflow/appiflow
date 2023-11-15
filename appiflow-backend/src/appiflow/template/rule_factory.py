from copy_all_files_rule_handler import CopyAllFilesRuleHandler
from copy_file_rule_handler import CopyFileRuleHandler
from constants import Constants


class RuleHandlerFactory:
    RULES_MAPPING = {
        Constants.COPY_SINGLE_FILE: CopyFileRuleHandler,
        Constants.COPY_ALL_FILES: CopyAllFilesRuleHandler,
        # Add more rules as needed
    }

    @staticmethod
    def get_rule(rule: str):
        handler_class = RuleHandlerFactory.RULES_MAPPING.get(rule)
        if handler_class:
            return handler_class()
        else:
            raise ValueError(f"Unsupported rule: {rule}")
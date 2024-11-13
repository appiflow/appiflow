def merge_dictionaries(dict1 : dict, dict2 : dict) -> dict:
    """Merge two dictionaries into one

    Args:
        dict1 (dict): dictionary 1
        dict2 (dict): dictionary 2

    Returns:
        dict: Merged dictionary
    """
    return dict1 | dict2

from lib.node import Node

def build_decision_tree(data, target):
    if len(set(target)) == 1:
        return Node(result=target[0])

    if len(data[0]) == 1:
        result = max(set(target), key=target.count)
        return Node(result=result)

    best_feature, best_value = find_best_split(data, target)

    left_data, left_target, right_data, right_target = split_data(data, target, best_feature, best_value)

    left_node = build_decision_tree(left_data, left_target)
    right_node = build_decision_tree(right_data, right_target)

    return Node(feature=best_feature, value=best_value, left=left_node, right=right_node)

def find_best_split(data, target):
    best_feature = None
    best_value = None
    best_score = 0

    for feature in range(len(data[0])):
        for value in set(data[:, feature]):
            left_data, left_target, right_data, right_target = split_data(data, target, feature, value)
            info_gain = calculate_information_gain(left_target, right_target)
            if info_gain > best_score:
                best_score = info_gain
                best_feature = feature
                best_value = value

    return best_feature, best_value

def split_data(data, target, feature, value):
    mask = data[:, feature] <= value
    left_data = data[mask]
    left_target = [target[i] for i in range(len(target)) if mask[i]]
    right_data = data[~mask]
    right_target = [target[i] for i in range(len(target)) if not mask[i]]
    return left_data, left_target, right_data, right_target

def calculate_information_gain(left_target, right_target):
    total_len = len(left_target) + len(right_target)
    p_left = len(left_target) / total_len
    p_right = len(right_target) / total_len

    info_gain = entropy(left_target + right_target) - (p_left * entropy(left_target) + p_right * entropy(right_target))
    return info_gain

def entropy(target):
    from math import log2
    classes = set(target)
    entropy_value = 0
    for c in classes:
        p = target.count(c) / len(target)
        entropy_value -= p * log2(p)
    return entropy_value

def doc_trieu_chung_tu_string(value, dic, trieu_trung_da_nhan_dien):
    value = value.replace(",", " , ")
    res = []
    for item in dic:
        if item in value and item not in trieu_trung_da_nhan_dien:
            value = value.replace(item, "")
            res.append(item)
    return res
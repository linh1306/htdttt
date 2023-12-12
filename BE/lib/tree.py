import numpy as np
from lib.fuc import build_decision_tree


class Tree:
    def __init__(self, x_train, y_train):
        self.dictionary = list(set([element for sub_array in x_train for element in sub_array]))
        self.node_root = build_decision_tree(self.to_vector(x_train), np.array(y_train))

    def to_vector(self, array):
        array_vector = []
        for items in array:
            vecto = [0] * len(self.dictionary)
            for item in items:
                if item in self.dictionary:
                    vecto[self.dictionary.index(item)] += 1
            array_vector.append(vecto)

        return np.array(array_vector)

    def check(self, input_user):
        if isinstance(input_user, str):
            input_user = input_user.split()
        input_vector = self.to_vector([input_user])[0]
        node = self.node_root
        while node.left or node.right:
            if input_vector[node.feature] <= node.value:
                node = node.left
            else:
                node = node.right
        return node.result


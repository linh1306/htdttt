from lib.tree import Tree

def train_intent(arr):
    x_train = []
    y_train = []
    for key in arr:
        for word in arr[key]:
            word = word.split()
            x_train.append(word)
            y_train.append(key)
    return Tree(x_train, y_train)


def train_sick(arr):
    x_train = []
    y_train = []
    for key in arr:
        x_train.append(arr[key])
        y_train.append(key)
    return Tree(x_train, y_train)

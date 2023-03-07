def remove_islands(matrix):
    """My main function for solving Clement Mihailescu's Island Interview question

    Given a 2D array of 1's and 0's, set all the 1's to 0 that are not on a border
    or adjacent (via cardinal directions) to a series of adjacent 1's that are connected
    to the border.

    Example Input:
        [
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1]
        ]

    Resulting output:
        [
            [1, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 1]
        ]   
    """
    
    matrix_length = len(matrix)
    # Get all border indices
    border_indices = get_border_indices(matrix_length)
    valid_indices = set()
    for index in border_indices:
        validate_index(index[0], index[1], matrix, valid_indices)

    interior_indices = get_interor_indices(matrix_length)
    for index in interior_indices:
        x = index[0]
        y = index[1]
        if get_index_str(x, y) not in valid_indices:
            matrix[y][x] = 0

    return matrix
    

def get_border_indices(matrix_len: int):
    """Returns a list of the border indices assuming matrix is a square."""
    border_indices = []
    for i in range(0, matrix_len):
        border_indices.append((0, i))
        border_indices.append((i, 0))
        border_indices.append((matrix_len-1, i))
        border_indices.append((i, matrix_len-1))
    return border_indices

def get_interor_indices(matrix_len):
    """Returns a list of the interior indices assuming matrix is a square."""
    interior_indices = []
    for x in range(1, matrix_len-1):
        for y in range(1, matrix_len-1):
            interior_indices.append((x, y))
    return interior_indices


def validate_index(x, y, matrix, valid_indices):
    """Builds the list of valid 1's in the matrix"""
    index_str = get_index_str(x, y)
    # If we've already checked this index, we don't need to check it again
    if index_str in valid_indices:
        return
    else:
        if matrix[y][x] == 1:
            valid_indices.add(index_str)

            # Visit each of its cardinal direction neighbors and check them recursively
            if len(matrix) > 0 and x+1 < len(matrix[0]):
                validate_index(x+1, y, matrix, valid_indices)
            if x-1 >= 0:
                validate_index(x-1, y, matrix, valid_indices)
            if y+1 < len(matrix):
                validate_index(x, y+1, matrix, valid_indices)
            if y-1 >= 0:
                validate_index(x, y-1, matrix, valid_indices)
        else:
            return

def get_index_str(x: int, y: int):
    return f"{x}, {y}"

if __name__ == "__main__":
    example_input = [
            [1, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 1, 1],
            [0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 1, 0],
            [1, 0, 1, 1, 0, 0],
            [1, 0, 0, 0, 0, 1]
        ]
    print(remove_islands(input))
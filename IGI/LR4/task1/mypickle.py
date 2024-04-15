from student import students
import pickle

def write_in_pickle(filename):
    '''write to pickle file'''
    with open(filename, 'wb') as f:
        pickle.dump({k: v.convert() for k, v in students.items()}, f)

def read_from_pickle(filename):
    '''read from picke file'''
    with open(filename, 'rb') as f:
        res = pickle.load(f)
    return res
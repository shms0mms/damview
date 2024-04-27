
def convert_tests(inputs, answer):
    a = {
        "input":inputs,
        "answer":answer,
    }
    return a

def convert(name,task,exec_input,exec_answer,dificalty,params):
    tests = []
    for i in range(2):
        a = convert_tests(inputs=input(),answer=input() )
        tests.append(a)
    task = {
    "name": name,
    "task": task,
    "exec_input": exec_input,
    "exec_answer": exec_answer,
    "params": params,
    "tests": tests,
    "dificalty": dificalty
    }
    
    return task



print(convert(name=input("name "), task=input("task "), exec_answer=input("exec_answer "),exec_input=input("exec_input "), dificalty=input("dificalty "), params=input("params ") ))


# {'name': 'Search Insert Position',
#  'task': 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.',
#  'exec_input': '2',
#  'exec_answer': 'nums = [1,3,5,6], target = 5',
#  'params': 'nums,target',
#  'tests': [{'input': 'nums=[1,3,5,6],target=7', 'answer': '4'}, {'input': 'nums=[1,3,5,6],target=2', 'answer': '1'}], 
# 'dificalty': 'Easy'}
# 
# {'name': 'Two Sum', 
# 'task': 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.', 
# 'exec_input': '[0,1]', 
# 'exec_answer': 'nums = [2,7,11,15], target = 9', 
# 'params': 'nums,target', 
# 'tests': [{'input': 'nums=[2,7,11,15],target=9', 'answer': '[0,1]'}, {'input': 'nums=[3,2,4],target=6', 'answer': '[1,2]'}], 'dificalty': 'Easy'}











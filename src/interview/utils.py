
# import types

# [
#     {
#     "data":{},
#     "result":json.string
    
#     },
#     {},{},{}
# ]




def valid_code(params, code: str, values,func):
    code_string = f"def func{params}\n" + code
    my_namespace = {}
    
    try:
        exec(code_string, my_namespace)
        print(my_namespace[func](values[0].get("data")))  
        
        return True
    except Exception as e:
        return e

print(valid_code("(b23):", "    print(b2)\n    a = 5\n    print(a)\n", [{"data": "some_value"}]))

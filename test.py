# import types


# code_string = f"def func{params}\n  print(a)\n  a = 4\n  print(b+a)"
# my_namespace = types.SimpleNamespace()
# exec(code_string, my_namespace.__dict__)
# (my_namespace.func(2,3))  


# __



# a = {
#     "a":2,
#     "b":23
# }
# print(**a)

# import subprocess

# def main(code):
#     result = subprocess.run(["pyflakes", "-"], input=code.encode(), text=True, capture_output=True)
#     if result.returncode == 0:
#         return {"success": True}
#     else:
#         errors = result.stdout.strip().split("\n")
#         return {"success": False, "errors": errors}
    
    
# main(
#     "print(3)"
# )    

# import uuid


# print(type(uuid.uuid1()))



my_namespace = {}
    
exec(code, my_namespace)
a = my_namespace["func"]()  
        
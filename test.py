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

# code = "def main():\n   a = 2^100\n   return a"

# my_namespace = {}
    
# exec(code, my_namespace)
# a = my_namespace["main"]()


# code = "1234"
# print(code[1:-1])

# def searchInsert(nums, target):
#         left, right = 0, len(nums) - 1

#         while left <= right:
#             mid = left + (right - left) // 2

#             if nums[mid] == target:
#                 return mid
#             elif nums[mid] < target:
#                 left = mid + 1
#             else:
#                 right = mid - 1

#         return left
    
# print(searchInsert(nums = [1,3,5,6], target = 5))

print("def main(nums,target):\n        left, right = 0, len(nums) - 1\n        while left <= right:\n            mid = left + (right - left) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return left")

# {
# "name": "Search Insert Position",
# "task": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order. You must write an algorithm with O(log n) runtime complexity.",
# "exec_input": "2",
# "exec_answer": "nums = [1,3,5,6], target = 5",
# "params": "nums,target",
# "tests": [{"input": {"nums":[1,3,5,6],"target":7}, "answer": 4}, {"input": {"nums":[1,3,5,6],"target":2}, "answer": 1}],
# "dificalty": "easy"
# }
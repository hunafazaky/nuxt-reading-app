import os
import glob

replacements = [
    ('dispatch("getWorks"', 'dispatch("works/getWorks"'),
    ("dispatch('getWorks'", "dispatch('works/getWorks'"),
    ('dispatch("getWorkById"', 'dispatch("works/getWorkById"'),
    ("dispatch('getWorkById'", "dispatch('works/getWorkById'"),
    ('dispatch("updateReaders"', 'dispatch("works/updateReaders"'),
    ("dispatch('updateReaders'", "dispatch('works/updateReaders'"),
    ('dispatch("updateLikeBy"', 'dispatch("works/updateLikeBy"'),
    ("dispatch('updateLikeBy'", "dispatch('works/updateLikeBy'"),
    ('dispatch("updateRateBy"', 'dispatch("works/updateRateBy"'),
    ("dispatch('updateRateBy'", "dispatch('works/updateRateBy'"),
    ('dispatch("removeLikeBy"', 'dispatch("works/removeLikeBy"'),
    ("dispatch('removeLikeBy'", "dispatch('works/removeLikeBy'"),
    ('dispatch("postWork"', 'dispatch("works/postWork"'),
    ("dispatch('postWork'", "dispatch('works/postWork'"),
    ('dispatch("deleteWork"', 'dispatch("works/deleteWork"'),
    ("dispatch('deleteWork'", "dispatch('works/deleteWork'"),

    ('dispatch("getUsers"', 'dispatch("users/getUsers"'),
    ("dispatch('getUsers'", "dispatch('users/getUsers'"),
    ('dispatch("getUserById"', 'dispatch("users/getUserById"'),
    ("dispatch('getUserById'", "dispatch('users/getUserById'"),
    ('dispatch("getUser"', 'dispatch("users/getUser"'),
    ("dispatch('getUser'", "dispatch('users/getUser'"),
    ('dispatch("updateReadList"', 'dispatch("users/updateReadList"'),
    ("dispatch('updateReadList'", "dispatch('users/updateReadList'"),
    ('dispatch("updateLikeList"', 'dispatch("users/updateLikeList"'),
    ("dispatch('updateLikeList'", "dispatch('users/updateLikeList'"),
    ('dispatch("updateRateList"', 'dispatch("users/updateRateList"'),
    ("dispatch('updateRateList'", "dispatch('users/updateRateList'"),
    ('dispatch("removeLikeList"', 'dispatch("users/removeLikeList"'),
    ("dispatch('removeLikeList'", "dispatch('users/removeLikeList'"),
    ('dispatch("signin"', 'dispatch("users/signin"'),
    ("dispatch('signin'", "dispatch('users/signin'"),
    ('dispatch("signup"', 'dispatch("users/signup"'),
    ("dispatch('signup'", "dispatch('users/signup'"),

    ('dispatch("getForYou"', 'dispatch("recommender/getForYou"'),
    ("dispatch('getForYou'", "dispatch('recommender/getForYou'"),
    ('dispatch("updateRecommender"', 'dispatch("recommender/updateRecommender"'),
    ("dispatch('updateRecommender'", "dispatch('recommender/updateRecommender'"),

    ('getters["works"]', 'getters["works/works"]'),
    ("getters['works']", "getters['works/works']"),
    ('getters["work"]', 'getters["works/work"]'),
    ("getters['work']", "getters['works/work']"),
    ('getters["users"]', 'getters["users/users"]'),
    ("getters['users']", "getters['users/users']"),
    ('getters["me"]', 'getters["users/me"]'),
    ("getters['me']", "getters['users/me']"),
    ('getters["foryou"]', 'getters["recommender/foryou"]'),
    ("getters['foryou']", "getters['recommender/foryou']"),
]

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

vue_files = glob.glob('**/*.vue', recursive=True)
for file in vue_files:
    replace_in_file(file)


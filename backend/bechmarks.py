import core_ai
from core_ai import CORE_CONTROLLER
from database import user_testing_db
from core_ai import Configs
import os
import glob
import random
import numpy as np
import tqdm
import pickle
from bson.binary import Binary
'''
    Run benchmark of system
'''
    


def insert_users_into_db(path:str):
    '''
        Insert all user with from folder
        Args:
            path: path to folder with struct 
                    path/
                        user01/
                                *.wav
                        user02/
                                *.wav
    '''
    print('Insert users into database ....')
    users = sorted(os.listdir(path))
    users_len = len(users)
    n_enroll = int(users_len/2)
    acept_users = users[:n_enroll]
    reject_users = users[n_enroll+1:]
    for user in acept_users:
        result = user_testing_db.find_one({"username": user})
        if result is not None:
            continue
        all_files = glob.glob(os.path.join(path, user, '*.wav'))
        if len(all_files) >= Configs.NUM_ENROLLMENTS:
            enroll_files = random.sample(all_files, Configs.NUM_ENROLLMENTS)
            enroll_bytes = []
            for file in enroll_files:
                with open(file, 'rb') as rb:
                    enroll_bytes.append(rb.read())
            feats = CORE_CONTROLLER.instance.extract_features(enroll_bytes)
            user_testing_db.insert_one({
                "username": user,
                "features": Binary(pickle.dumps(feats, protocol=2))
            })
    return acept_users, reject_users
def compute_eer(scores, labels, threshold):
    pos_scores = np.array([scores[i] for i in range(len(labels)) if labels[i] == 1])
    neg_scores = np.array([scores[i] for i in range(len(labels)) if labels[i] == 0])

    FRR = sum((pos_scores <= threshold).astype(int)) / pos_scores.shape[0]

    FAR = sum((neg_scores > threshold).astype(int)) / neg_scores.shape[0]

    EER = (FRR + FAR)*100 / 2
    return EER
def verify_users(path:str, 
                 accept_users:list,
                 reject_users:list):
    print('Testing ....')
    results = {}
    users_db = user_testing_db.find({})
    labels = {
        'system': [],
        'user': []
    }
    scores = []
    
    for user in accept_users:
        all_files = glob.glob(os.path.join(path, user, '*.wav'))
        print('User %s'%(user))
        for file in tqdm.tqdm(all_files):
            rf = open(file, 'rb')
            wav_bytes = rf.read()
            feat_test = CORE_CONTROLLER.instance.extract_features([wav_bytes])
            max_score = 0
            user_ = ''
            for user_db in users_db:
                score = CORE_CONTROLLER.instance.compute_score(feat_test,  pickle.loads(user_db['features']))
                if score > max_score:
                    max_score = score
                    user_ = user_db['username']
            
            scores.append(score)
            labels['system'].append(1)
            labels['user'].append(1 if user_ == user else 0)
    
    
    for user in reject_users:
        print('User %s'%(user))
        all_files = glob.glob(os.path.join(path, user, '*.wav'))
        for file in tqdm.tqdm(all_files):
            rf = open(file, 'rb')
            wav_bytes = rf.read()
            feat_test = CORE_CONTROLLER.instance.extract_features([wav_bytes])
            max_score = 0
            user_ = ''
            for user_db in users_db:
                score = CORE_CONTROLLER.instance.compute_score(feat_test,  pickle.loads(user_db['features']))
                if score > max_score:
                    max_score = score
                    user_ = user_db['username']
            
            scores.append(score)
            labels['system'].append(0)
            labels['user'].append(0)
    
    eer = compute_eer(scores=scores,
                      labels=labels['system'],
                      threshold=Configs.THRESHOLD)
    results['system'] = eer
    return results

if __name__ == '__main__':
    my_path = 'D:\Code\AudioMNIST\data'
    accept_users, reject_users = insert_users_into_db(my_path)
    result = verify_users(my_path, accept_users, reject_users)
    print(result)

            


            
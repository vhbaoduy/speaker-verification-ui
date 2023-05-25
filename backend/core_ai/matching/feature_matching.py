import torch
import numpy as np

# def make_decision(mo)

def compute_score(embedding1: torch.Tensor,
                   embedding2: torch.Tensor):
    '''
        Compute similarity score between two embeddings
        Args:
            embeddings1: Tensor with N x 192
            embedings2: Tensor with M x 192
        
        Return: Cosine score between two embeddings
    '''
    score = torch.mean(torch.matmul(
                embedding1, embedding2.T))
    score = score.detach().cpu().numpy()
    return score

def make_decision(embedding1:torch.Tensor,
                  embedding2:torch.Tensor,
                  threshold: float):
    '''
        Make decision between two embeddings
        Args:
            embeddings1: Tensor with N x 192
            embedings2: Tensor with M x 192
            threshold: score threshold to consider accept/reject
        Return: True/False
    '''
    score = compute_score(embedding1,embedding2)
    return score > threshold, score

import librosa
import noisereduce as nr
import soundfile as sf
import torchaudio
from pydub import AudioSegment
from preprocessing import SilenceRemover

path = 'D:\my_audio_mnist_0_9\loop3\9_9_9\si\9_9_9_3.wav'
# sound = AudioSegment.from_wav('../temp_files/temp.wav')
# print(sound)
audio, sr = librosa.load(path, sr=16000)
# clips = librosa.effects.split(audio, top_db=10)
# wav_data = []
# for c in clips:
#     print(c)
#     data = audio[c[0]: c[1]]
#     wav_data.extend(data)
# sf.write('trim_data.wav', wav_data, sr)

# silence_remove = SilenceRemover(min_silence_len=100,
#                                 silence_threshold=-45,
#                                 keep_silence=50)
# silence_remove(sound)
reduced_noise = nr.reduce_noise(y=audio, 
                                sr=sr,
                                stationary=False)
print(type(reduced_noise))
sf.write("mywav_reduced_noise.wav", reduced_noise,sr)


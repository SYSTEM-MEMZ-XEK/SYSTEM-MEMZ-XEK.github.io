// 假设所有歌曲都在 "music" 文件夹中
const musicFolder = "music/";

// 使用 fetch API 获取歌曲列表
fetch(musicFolder)
   .then(response => response.text())
   .then(data => {
        // 解析返回的 HTML 数据
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, "text/html");
        
        // 获取所有歌曲文件的链接
        const songLinks = htmlDoc.querySelectorAll("a[href$='.mp3']");
        
        // 创建一个歌曲列表的容器
        const songListContainer = document.getElementById("songList");
        
        // 遍历所有歌曲链接，为每个歌曲创建一个播放按钮和文件名显示
        songLinks.forEach(songLink => {
            const songName = songLink.textContent;
            const songUrl = songLink.href;
            
            // 创建一个包含歌曲信息的容器
            const songItem = document.createElement("div");
            songItem.classList.add("song-item");
            
            // 创建一个播放按钮
            const playButton = document.createElement("button");
            playButton.textContent = "播放";
            playButton.onclick = () => loadTrack(songUrl);
            
            // 创建一个显示歌曲名的元素
            const songNameElement = document.createElement("span");
            songNameElement.textContent = songName;
            
            // 将播放按钮和歌曲名添加到歌曲项中
            songItem.appendChild(playButton);
            songItem.appendChild(songNameElement);
            
            // 将歌曲项添加到歌曲列表容器中
            songListContainer.appendChild(songItem);
        });
    })
   .catch(error => {
        console.error("获取歌曲列表失败:", error);
    });

// 加载和播放音频的函数
function loadTrack(trackUrl) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.src = trackUrl;
    audioPlayer.play();
}

// 播放音频的函数
function playAudio() {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.play();
}

// 暂停音频的函数
function pauseAudio() {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.pause();
}

// 设置音频进度的函数
function setProgress(value) {
    const audioPlayer = document.getElementById("audioPlayer");
    audioPlayer.currentTime = value;
}

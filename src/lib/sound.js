export const createSound = url => {
    const audio = new Audio()
    audio.src = url;

    return new Promise((resolve)=>{
        audio.addEventListener('canplaythrough', ()=>resolve(audio), {once:true})
    })
}

export function getCloudinaryPublicKey(url){
    return url?.split('/')?.slice(-1)?.[0]?.split('.')?.[0];
}
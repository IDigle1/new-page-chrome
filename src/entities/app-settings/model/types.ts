export interface IBackgroundSettings {
    appBackgroundColor: string
    appBackgroundImage: string
    appBackgroundImageRepeat: 'repeat' | 'no-repeat'
    appBackgroundImagePosition: 'bottom' | 'center' | 'left' | 'right' | 'top'
    appBackgroundImageSize: 'contain' | 'cover' | 'auto'
}

export interface IWatchSettings {
    watchColor: string
}
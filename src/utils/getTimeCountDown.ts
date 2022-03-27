import moment from 'moment-timezone'


export const getTimeCountDown = (time:string) => {
    const now = new Date();
    const ms = moment
        .utc(time, 'YYYY-MM-DD HH:mm:ss')
        .diff(moment.utc(now, 'YYYY-MM-DD HH:mm:ss'));
    const d:any = moment.duration(ms);
 
    const seconds = Math.round(d.asMilliseconds()) / 1000

    return  ms > 0 ? {
        dd: Math.floor(d._milliseconds / 1000 / 60 / 60 / 24),
        hh: moment
        .unix(seconds)
        .utc()
        .format('HH'),
        mm: moment
        .unix(seconds)
        .utc()
        .format('mm'),
        ss: moment
        .unix(seconds)
        .utc()
        .format('ss'),
    } : {
        dd: 0,
        hh: '00',
        mm: '00',
        ss: '00'
    }
}

export const getTimeCountCircle = (startTime: string, endTime: string, offset: string, array: string) => {
    const now = new Date().getTime()
    const time = ((Number(now) / 1000) - Number(startTime)) / (Number(endTime) - Number(startTime)) * 100
    const percent = Number(offset) + ( Number(array) - Number(offset) ) * time / 100

    return {
        percent: percent
    };
}

import cors from 'cors'
export const corsConfig =
{
    origin:function(origin, callback){
        const allowedList = [process.env.FRONTEND_URL]
         if(process.argv[2] === '--api') {
            allowedList.push(undefined)
        }

        if(allowedList.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
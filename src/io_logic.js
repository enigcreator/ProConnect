mysqlQuery = require ('./database');

exports = module.exports = function (io)
{


    io.on('connection', (socket) => {

       
        socket.emit("handshake_1","IDS");
 
        socket.on('updateSockets', function (data) {

            console.log("updated");
            mysqlQuery("update user set socketid = '"+socket.id+"' where id = "+data.id+";", null, (err, rows) =>{

                if(err)
                {
                    console.log(err);
                    throw err;
                }

                else
                    socket.emit("status", "success");

            });



        });

        socket.on('insert', function (data)  {

            
            mysqlQuery("insert into message (from_user_id, to_user_id, message) value ("+data.from+","+data.to+", ?)",[data.text], (err, rows) =>{

                console.log("start");
                if(err) throw err;
                else
                 {
                     console.log(data);
                    mysqlQuery("select * from message where from_user_id in ("+data.from+","+data.to+")  and to_user_id in ("+data.from+","+data.to+") order by time desc limit 1;", null , (err, rows) =>
                    {
                        if(err) throw err;
                        else
                        {
                            mysqlQuery("select socketid from user where id in ("+data.from+","+data.to+")", null, (err, rows_2) =>{

                        
                                if(err) throw err;
                                else 
                                {
                                io.to(rows_2[0].socketid).emit('chat', rows);
                                io.to(rows_2[1].socketid).emit('chat', rows);
                                console.log("done");
                                }

                            });
                        }
            
                    });
                 }
        });

        });

        socket.on('chat', function (data) {

            
            mysqlQuery("select * from message where from_user_id in ("+data.from+","+data.to+")  and to_user_id in ("+data.from+","+data.to+") order by time desc limit 1;", null , (err, rows) =>
        {
            if(err) throw err;
            else
            {
                socket.emit('chat', rows);
            }

        });
            

        });

        

        

    });
}
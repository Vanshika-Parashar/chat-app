import { createContext,useContext ,useEffect,useState} from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext=createContext();

export const ChatProvider = ({children})=>{

    //store messages for the selected user
    const [messages,setMessages]= useState([]);
    //store list of users for left side bar
    const[users,setUsers]=useState([]);
    //store the id of user to whom we want to chat
    const[selectedUser,setSelectedUser]=useState(null);
    //store users id and and store no of unseen messages for this particular user ,store in key-value pair
    const[unseenMessages,setUnseenMessages]=useState({});

    const {socket,axios}=useContext(AuthContext);

    //functio to add all users to side bar
    const getUsers=async()=>{
        try {
            const { data } = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to get messages for selected user
    const getMessages = async(userId)=>{
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
            
        }
    }

    //function to send message to selected user
    const sendMessage = async(messageData)=>{
        try {
            const {data}=await axios.post(`/api/messages/send/${selectedUser._id}`,messageData);
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages,data.message])
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //function to subscribe to mesage to selected user(get new messages in real time)
    const subscribeToMessages = async () =>{
        if(!socket) return;

        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId===selectedUser._id){
                newMessage.seen=true;
                setMessages((prevMessages)=>[...prevMessages,newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages)=>({
                    ...prevUnseenMessages,[newMessage.senderId] : 
                    prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
                    [newMessage.senderId] + 1 : 1
                }))
            }
        })
    }

    //function to unsusribe from messages
    const unsubscribeFromMessages = () =>{
        if(socket) socket.off("newMessage");
    }
    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();
    },[socket,selectedUser])

    const value={
        messages,users,selectedUser,getUsers,getMessages,sendMessage,
        setSelectedUser,unseenMessages,setUnseenMessages

    }

    return(
    <ChatContext.Provider value={value}>
        {children}
    </ChatContext.Provider>
    )
}



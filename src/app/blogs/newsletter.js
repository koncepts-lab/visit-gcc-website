import React, {useState, useEffect} from 'react'
import style from'./style.module.css'
import { useSnackbar } from 'notistack';
import axios from 'axios';

function Newsletter() {
        const { enqueueSnackbar } = useSnackbar();
    
    const [newsletter, setNewsletter] = useState({
       name:"",
       email:""
    });
       const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);  


        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setNewsletter((prev) => ({
              ...prev,
              [name]: value,
            }));
          };
        
          const handleSubscribe = async () => {
            if (!newsletter.name || !newsletter.email) {
              setError("Both Name and Email are required.");
              return;
            }
        
            setIsLoading(true);
            setError(null);  
            try {
              const registerToken = localStorage.getItem("auth_token_register");
            const loginToken = localStorage.getItem("auth_token_login");
            let authToken = null;
      
           if (loginToken) {
              authToken = loginToken;
              console.log("Using login token for fetching packages.");
            }
            else if (registerToken) {
              authToken = registerToken;
              console.log("Using register token for fetching packages.");
            } 
      
            if (!authToken) {
              setError("Authentication token not found");
              setIsLoading(false);
              return;
            }      
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}newsletter-subscription`,
                {
                  name: newsletter.name,
                  email: newsletter.email,
                },
                {
                  headers: {
                    Authorization: `Bearer ${authToken}`,
                  },
                }
              ); 
              console.log(response.data)
              enqueueSnackbar("Successfully subscribed to the newsletter!", { variant: "success" });        setNewsletter({ name: "", email: "" });
            } catch (err) {
              console.error("Error subscribing to newsletter:", err);
              setError("Failed to subscribe. Please try again.");
              enqueueSnackbar("Failed to subscribe. Please try again.", { variant: "error" });
      
            } finally {
              setIsLoading(false);
            }
          };

  return (
    <div>       
       <p className={`${style["all-title"]}`}>Subscribe Newsletter</p>
    <div className={`${style["newsletter"]}`}>
               <input
                 type="text"
                 name="name"
                 placeholder="Name"
                 value={newsletter.name}
                 onChange={handleInputChange}
                 className={`${style["promo_input2"]} col-12`}
               />
               <input
                 type="email"
                 name="email"
                 placeholder="Email address"
                 value={newsletter.email}
                 onChange={handleInputChange}
                 className={`${style["promo_input2"]} col-12`}
               />
               <button className='col-12'
                 onClick={handleSubscribe}
                 disabled={isLoading}>{isLoading ? "Subscribing..." : "SUBSCRIBE"}
                 </button>
    </div>
    </div>
  )
}

export default Newsletter
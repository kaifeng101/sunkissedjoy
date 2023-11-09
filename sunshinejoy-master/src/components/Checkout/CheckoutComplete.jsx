import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import ProcessingOrderIcon from '../../assets/checkout-icons/order-processed.png';
import PaymentVerifiedIcon from '../../assets/checkout-icons/credit-card.png';
import OrderPlacedIcon from '../../assets/checkout-icons/thumbs-up.png';
import SendingOrderIcon from '../../assets/checkout-icons/mail.png';
//const CheckoutComplete = ({orderId}) => {
//    const [progress,setProgress] = useState(0);
//    const [message,setMessage] = useState(null);

//    useEffect(()=>{
//        const interval = setInterval(()=>{
//            setProgress(prev=>prev+10)
//            if (progress >=100)  clearInterval(interval);
//        },800)
//        if (progress)
//        return ()=>clearInterval(interval)
//    }, [])
//    const navigate = useNavigate();
//    useEffect(()=>{
//        if (progress === 0) setMessage({text : 'Processing your order',color : 'text-yellow-500', emoji : ProcessingOrderIcon})
//        else if (progress <= 30) setMessage({text : 'Sending your order to joy',color : 'text-orange-500', emoji :  SendingOrderIcon})
//        else if (progress <= 70) setMessage({text : 'Verifying Payment',color : 'text-blue-400', emoji : PaymentVerifiedIcon})
//        else  setMessage({text : 'Order Placed Successfully!',color : 'text-orange-600', emoji : OrderPlacedIcon})

//        if (progress>=100) {
//            setTimeout(()=>{
//                navigate(`/account/mygifts/${orderId}`)
//            }, [1500])
//        }
//    }, [progress])
//  return (
//    <div className='flex items-center flex-col mt-12 justify-center'>
//    <div className={`${progress>=100?'h-[250px] w-[250px]':'h-[400px] w-[400px]'} transition-all duration-500`}>
//        <CircularProgressbarWithChildren styles={buildStyles({
//            pathColor : '#fcb53f'
//        })} value={progress} maxValue={100}>
//            {message&&<div className=''><img src={message?.emoji} className='w-[60px]'/></div>}
//            {message&&progress<100&&<div className={`mt-2 font-[600] text-lg ${message?.color}`}>{message?.text}</div>}
//        </CircularProgressbarWithChildren>
//    </div>
//    {progress>=100&&<div className='mt-4 font-[500] text-lg'>Your Order has been placed. <span className='font-semibold text-center block'>Redirecting to Home!</span></div>}
//    </div>
//  )
//}

//export default CheckoutComplete

class CheckoutComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            message: null,
        };
        this.navigate = useNavigate();
    }

    componentDidMount() {
        const interval = setInterval(() => {
            this.setState((prevState) => ({ progress: prevState.progress + 10 }));
            if (this.state.progress >= 100) clearInterval(interval);
        }, 800);

        if (this.state.progress) return () => clearInterval(interval);
    }

    componentDidUpdate(prevProps, prevState) {
        const { progress } = this.state;
        if (progress === 0)
            this.setState({ message: { text: 'Processing your order', color: 'text-yellow-500', emoji: ProcessingOrderIcon } });
        else if (progress <= 30)
            this.setState({ message: { text: 'Sending your order to joy', color: 'text-orange-500', emoji: SendingOrderIcon } });
        else if (progress <= 70)
            this.setState({ message: { text: 'Verifying Payment', color: 'text-blue-400', emoji: PaymentVerifiedIcon } });
        else this.setState({ message: { text: 'Order Placed Successfully!', color: 'text-orange-600', emoji: OrderPlacedIcon } });

        if (progress >= 100) {
            setTimeout(() => {
                this.navigate(`/account/mygifts/${this.props.orderId}`);
            }, 1500);
        }
    }

    render() {
        const { progress, message } = this.state;
        return (
            <div className="flex items-center flex-col mt-12 justify-center">
                <div className={`${progress >= 100 ? 'h-[250px] w-[250px]' : 'h-[400px] w-[400px]'} transition-all duration-500`}>
                    <CircularProgressbarWithChildren styles={buildStyles({ pathColor: '#fcb53f' })} value={progress} maxValue={100}>
                        {message && <div className=""><img src={message?.emoji} className="w-[60px]" alt="emoji" /></div>}
                        {message && progress < 100 && (
                            <div className={`mt-2 font-[600] text-lg ${message?.color}`}>{message?.text}</div>
                        )}
                    </CircularProgressbarWithChildren>
                </div>
                {progress >= 100 && (
                    <div className="mt-4 font-[500] text-lg">
                        Your Order has been placed <span className="font-semibold text-center block">Redirecting to Home!</span>
                    </div>
                )}
            </div>
        );
    }
}

export default CheckoutComplete
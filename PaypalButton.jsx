import { PayPalButtons } from "@paypal/react-paypal-js"



export const PaypalButton = ({totalValue, invoice, setVideo}) => {
  return (
    <>
<PayPalButtons createOrder={(data, action) => {
    return action.order.create({
        purchase_units: [
            {
                description: invoice,
                amount: {
                    value: totalValue
                }
            }
        ]
    })
}} 
onApprove={ async (data, actions) => {
    const order = await actions.order?.capture()
    setVideo(true)
    setOpenv(false)
}}

/>
    </>
  )
}
import "./modal.scss";

const Modal = ({children, showModal, closeModal}) => {
    return(
        <div className="modal" style={showModal ? {display: "flex"} : {display: "none"}}>
            <div className="modal__content">
                <div className="modal__header">
                    <span className="modal__title">{children.props?.title}</span>
                    <img alt="close" src={`${process.env.PUBLIC_URL}/images/menu/close_dark.png`} onClick={closeModal} className="modal__close"/>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;
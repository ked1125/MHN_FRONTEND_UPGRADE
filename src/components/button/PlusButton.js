import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function PlusButton() {
    const loginState = useSelector((state) => {
        console.log(state.userSlice);
        console.log(state.userSlice.id);
        return state.userSlice;
    });
    return (
        <div className="w-full ">
            {/* <div className="flex justify-end fixed bottom-[75px] z-50  "> */}
            {loginState.memberTypeList[0] == "ADMIN" ? (
                <div className="flex justify-end absolute bottom-[75px] right-[20px] z-50 max-w-full">
                    <Link to="/admin">
                        <img
                            src="/assets/images/adminButton.svg"
                            className="w-[45px] h-[45px]"
                        />
                    </Link>
                </div>
            ) : (
                <div className="flex justify-end absolute bottom-[75px] right-[20px] z-50 max-w-full">
                    <Link to="/chatboards/new">
                        <img src="/assets/images/plusIcon.svg" />
                    </Link>
                </div>
            )}
        </div>
    );
}

export default PlusButton;

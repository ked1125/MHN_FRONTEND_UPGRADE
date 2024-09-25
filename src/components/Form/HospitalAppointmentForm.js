import React from "react";

function HospitalAppointmentForm({
    appointmentList,
    formatDate,
    requestApproval,
}) {
    return (
        <>
            {Array.isArray(appointmentList) ? (
                <>
                    {/* PENDING 상태의 예약 */}
                    {appointmentList
                        .filter(
                            (appointment) => appointment.status === "PENDING"
                        )
                        .map((appointment) => (
                            <div
                                key={appointment.id}
                                className={`border border-gray-600 rounded-md p-4 mt-8 ${
                                    appointment.status === "PENDING"
                                        ? "hover:border-blue-200 hover:shadow-md transition duration-300"
                                        : ""
                                }`}
                            >
                                <div className="flex justify-between body2 text-sub-200">
                                    {/* 병원 정보 시작 */}
                                    <div className="flex flex-col gap-2 mb-2 w-3/4">
                                        <p className="subtitle1 text-primary-300">
                                            <span className="body2 text-sub-100">
                                                이름 :{" "}
                                            </span>
                                            {appointment.member.name}
                                        </p>
                                        <p className="body2 text-sub-800">
                                            <span className="body2 text-sub-100">
                                                닉네임 :{" "}
                                            </span>
                                            {appointment.member.nickName}
                                        </p>
                                        <p className="body2 text-sub-800">
                                            <span className="body2 text-sub-100">
                                                연락처 :{" "}
                                            </span>
                                            {appointment.member.tel}
                                        </p>
                                    </div>
                                    {/* 병원 정보 종료  */}

                                    {/* 요청 상태 시작 */}
                                    <div className="flex gap-1 h-3 items-center">
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${appointment.status === "APPROVED" ? "bg-green-800" : appointment.status === "PENDING" ? "bg-yellow-500" : "bg-red-600"}`}
                                        ></span>
                                        <span
                                            className={`mini ${appointment.status === "APPROVED" ? "text-green-800" : appointment.status === "PENDING" ? "text-yellow-500" : "text-red-600"}`}
                                        >
                                            {appointment.status === "APPROVED"
                                                ? "예약확정"
                                                : appointment.status ===
                                                    "PENDING"
                                                  ? "수락대기"
                                                  : "거절 완료"}
                                        </span>
                                    </div>
                                    {/* 요청 상태 종료  */}
                                </div>

                                <div className="border-t border-dashed border-gray-700 flex justify-between pt-3">
                                    <p className="body3 text-sub-800">
                                        <span className="body2 text-sub-100">
                                            예약일자 :{" "}
                                        </span>
                                        {formatDate(
                                            appointment.appointmentDateTime
                                        )}
                                    </p>

                                    {/* 버튼 시작 */}
                                    <div className="flex gap-[4px]">
                                        {appointment.status === "PENDING" && (
                                            <button
                                                className="mini py-[6px] px-[14px] rounded-md bg-primary-300 text-primary-400 hover:bg-sub-200"
                                                onClick={() =>
                                                    requestApproval(
                                                        appointment.id,
                                                        "APPROVED"
                                                    )
                                                }
                                                // PENDING -> APPROVED로 변경하는 로직
                                            >
                                                요청수락
                                            </button>
                                        )}
                                        <button
                                            className={`mini py-[6px] px-[14px] rounded-md ${
                                                appointment.status !== "PENDING"
                                                    ? "bg-gray-300 text-gray-600"
                                                    : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                            }`}
                                            onClick={
                                                () =>
                                                    requestApproval(
                                                        appointment.id,
                                                        "REJECTED"
                                                    )
                                                //  PENDING -> REJECTED로 변경하는 로직
                                            }
                                            disabled={
                                                appointment.status !== "PENDING"
                                            }
                                        >
                                            {appointment.status !== "PENDING"
                                                ? "처리완료"
                                                : "요청거절"}
                                        </button>
                                    </div>
                                    {/* 버튼 종료  */}
                                </div>
                            </div>
                        ))}

                    {/* ##################나머지 상태의 예약################ */}
                    {appointmentList
                        .filter(
                            (appointment) => appointment.status !== "PENDING"
                        )
                        .map((appointment) => (
                            <div
                                key={appointment.id}
                                className="border border-gray-600 rounded-md p-4 mt-8"
                            >
                                <div className="flex justify-between body2 text-sub-200">
                                    {/* 병원 정보 시작 */}
                                    <div className="flex flex-col gap-2 mb-2 w-3/4">
                                        <p className="subtitle1 text-primary-300">
                                            <span className="body2 text-sub-100">
                                                이름 :{" "}
                                            </span>
                                            {appointment.member.name}
                                        </p>
                                        <p className="body2 text-sub-800">
                                            <span className="body2 text-sub-100">
                                                닉네임 :{" "}
                                            </span>
                                            {appointment.member.nickName}
                                        </p>
                                        <p className="body2 text-sub-800">
                                            <span className="body2 text-sub-100">
                                                연락처 :{" "}
                                            </span>
                                            {appointment.member.tel}
                                        </p>
                                    </div>
                                    {/* 병원 정보 종료  */}

                                    {/* 요청 상태 시작 */}
                                    <div className="flex gap-1 h-3 items-center">
                                        <span
                                            className={`inline-block w-3 h-3 rounded-full ${appointment.status === "APPROVED" ? "bg-green-800" : "bg-red-600"}`}
                                        ></span>
                                        <span
                                            className={`mini ${appointment.status === "APPROVED" ? "text-green-800" : "text-red-600"}`}
                                        >
                                            {appointment.status === "APPROVED"
                                                ? "예약확정"
                                                : "거절 완료"}
                                        </span>
                                    </div>
                                    {/* 요청 상태 종료  */}
                                </div>

                                <div className="border-t border-dashed border-gray-700 flex justify-between pt-3">
                                    <p className="body3 text-sub-800">
                                        <span className="body2 text-sub-100">
                                            예약일자 :{" "}
                                        </span>
                                        {formatDate(
                                            appointment.appointmentDateTime
                                        )}
                                    </p>

                                    {/* 버튼 시작 */}
                                    <div className="flex gap-[4px]">
                                        <button
                                            className={`mini py-[6px] px-[14px] rounded-md ${
                                                appointment.status !== "PENDING"
                                                    ? "bg-gray-300 text-gray-600"
                                                    : "bg-primary-300 text-primary-400 hover:bg-sub-200"
                                            }`}
                                            onClick={
                                                () =>
                                                    requestApproval(
                                                        appointment.id,
                                                        "REJECTED"
                                                    )
                                                //  PENDING -> REJECTED로 변경하는 로직
                                            }
                                            disabled={
                                                appointment.status !== "PENDING"
                                            }
                                        >
                                            {appointment.status !== "PENDING"
                                                ? "처리완료"
                                                : "요청거절"}
                                        </button>
                                    </div>
                                    {/* 버튼 종료  */}
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <p>예약 정보를 불러오는 중입니다...</p>
            )}
        </>
    );
}

export default HospitalAppointmentForm;

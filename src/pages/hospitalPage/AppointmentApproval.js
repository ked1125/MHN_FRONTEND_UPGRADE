import React, { useEffect, useState } from "react";
import Header from "../../layouts/header/Header";
import DoctorNav from "../../layouts/nav/DoctorNav";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import HospitalAppointmentForm from "../../components/Form/HospitalAppointmentForm";

function AppointmentApproval() {
    const [allAppointmentList, setAllAppointmentList] = useState(null);
    const [patchAppointmentList, setPatchAppointmentList] = useState(null);
    const [filterStatus, setFilterStatus] = useState("PENDING");
    const loginState = useSelector((state) => state.userSlice);
    console.log(loginState);

    async function getAllAppointmentList() {
        try {
            const res = await axiosInstance.get(
                `/hospital/appointment?hospitalId=${loginState.hospital.id}`
            );
            console.log(res.data);
            setAllAppointmentList(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const hour = date.getHours();
        const ampm = hour >= 12 ? "오후" : "오전";
        const formattedHour = (hour % 12 || 12).toString().padStart(2, "0");

        // return `${year}년 ${month}월 ${day}일 / ${ampm} ${formattedHour}시`;
        return `${month}월 ${day}일 / ${ampm} ${formattedHour}시`;
    };

    async function requestApproval(appointmentId, status) {
        try {
            const res = await axiosInstance.put(
                `/hospital/appointment/statusmodi?id=${appointmentId}&status=${status}`
            );
            console.log(res.data);
            setPatchAppointmentList(res.data);
            // 전체 목록 다시 로드
            getAllAppointmentList();
        } catch (error) {
            console.log(error);
        }
    }

    // 새로운 함수: 과거의 예약인지 확인
    const isPastAppointment = (appointmentDateTime) => {
        const now = new Date();
        const appointmentDate = new Date(appointmentDateTime);
        return appointmentDate < now;
    };

    // 새로운 함수: 과거의 PENDING 예약을 자동으로 거절
    const autoRejectPastAppointments = () => {
        if (Array.isArray(allAppointmentList)) {
            allAppointmentList.forEach((appointment) => {
                if (
                    appointment.status === "PENDING" &&
                    isPastAppointment(appointment.appointmentDateTime)
                ) {
                    requestApproval(appointment.id, "REJECTED");
                }
            });
        }
    };

    // 필터 상태를 변경하는 함수
    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    // 필터링된 예약 목록
    const filteredAppointmentList = allAppointmentList
        ? allAppointmentList.filter(
              (appointment) => appointment.status === filterStatus
          )
        : [];

    useEffect(() => {
        getAllAppointmentList();
    }, []);

    useEffect(() => {
        autoRejectPastAppointments();
    }, [allAppointmentList]);

    // loginState가 없거나 doctorStatus가 PENDING이면 아무것도 렌더링하지 않습니다.
    if (!loginState.hospital || loginState.doctorStatus === "PENDING") {
        return (
            <>
                <p>잘못된접근입니다</p>
                <Link to="/doctors/login">
                    <button className="font-bold">로그인 페이지로</button>
                </Link>
            </>
        );
    }
    return (
        <>
            <Header title="예약 관리 페이지" />
            <div className="flex justify-end gap-[8px] mt-[16px]">
                <p
                    className={`${filterStatus === "PENDING" ? "text-primary-300 font-bold" : "text-gray-300"} cursor-pointer`}
                    onClick={() => handleFilterChange("PENDING")}
                >
                    수락대기
                </p>
                <p
                    className={`${filterStatus === "APPROVED" ? "text-primary-300 font-bold" : "text-gray-300"} cursor-pointer border-r border-l px-[8px]`}
                    onClick={() => handleFilterChange("APPROVED")}
                >
                    확정된 요청
                </p>
                <p
                    className={`${filterStatus === "REJECTED" ? "text-primary-300 font-bold" : "text-gray-300"} cursor-pointer`}
                    onClick={() => handleFilterChange("REJECTED")}
                >
                    거절된 요청
                </p>
            </div>
            {allAppointmentList && (
                <HospitalAppointmentForm
                    appointmentList={filteredAppointmentList}
                    formatDate={formatDate}
                    requestApproval={requestApproval}
                />
            )}

            <DoctorNav />
        </>
    );
}

export default AppointmentApproval;

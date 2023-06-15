import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteAEnquiry,
    getEnquiries,
    resetState,
    updateAEnquiry,
} from "../features/enquiry/enquirySlice";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";

const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
    },
    {
        title: "Staus",
        dataIndex: "status",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
];

const Enquiries = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [enqId, setEnqId] = useState("");
    const showModal = (enquiryId) => {
        setOpen(true);
        setEnqId(enquiryId);
    };

    const hideModal = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(resetState());
        dispatch(getEnquiries());
    }, [dispatch]);

    const enquiries = useSelector((state) => state.enquiry.enquiries);
    const isEnquiryDeleted = useSelector(
        (state) => state.enquiry.deletedEnquiry
    );

    useEffect(() => {
        if (isEnquiryDeleted) {
            toast.success("Enquiry deleted successfully!");
            dispatch(getEnquiries());
        }
    }, [isEnquiryDeleted, dispatch]);

    const data = enquiries.map((enquiry, index) => ({
        key: index + 1,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        status: (
            <select
                name=""
                defaultValue={enquiry.status || "Submitted"}
                className="form-control form-select"
                id=""
                onChange={(e) => setEnquiryStatus(e.target.value, enquiry._id)}
            >
                <option value="Submitted">Submitted</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
            </select>
        ),
        action: (
            <>
                <Link
                    className="ms-3 fs-3 text-danger"
                    to={`/admin/enquiries/${enquiry._id}`}
                >
                    <AiOutlineEye />
                </Link>
                <button
                    className="ms-3 fs-3 text-danger bg-transparent border-0"
                    onClick={() => showModal(enquiry._id)}
                >
                    <AiFillDelete />
                </button>
            </>
        ),
    }));

    const setEnquiryStatus = (status, enquiryId) => {
        const data = { id: enquiryId, enqData: status };
        dispatch(updateAEnquiry(data));
    };

    const deleteEnquiry = (enquiryId) => {
        dispatch(deleteAEnquiry(enquiryId));
        setOpen(false);
    };

    return (
        <div>
            <h3 className="mb-4 title">Enquiries</h3>
            <div>
                <Table columns={columns} dataSource={data} />
            </div>
            <CustomModal
                hideModal={hideModal}
                open={open}
                performAction={() => deleteEnquiry(enqId)}
                title="Are you sure you want to delete this enquiry?"
            />
        </div>
    );
};

export default Enquiries;

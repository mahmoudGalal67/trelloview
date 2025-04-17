import React, { useState, useEffect } from "react";
import "./card.css";
import CardDetails from "../CardDetails/CardDetails";
import api from "../../apiAuth/auth";

import Cookies from "js-cookie";
import { MdOutlineEdit } from "react-icons/md";

const data = {
  id: 1,
  the_list_id: 4,
  text: "مطلوب عمل تاسك ....",
  description: "وصف التاسك",
  start_time: "2024-08-15T09:43:58.000000Z",
  end_time: null,
  created_at: "2024-08-15T09:43:58.000000Z",
  updated_at: "2024-08-15T09:43:58.000000Z",
  list: {
    id: 4,
    board_id: 1,
    title: "all tasks",
    created_at: "2024-08-15T09:43:43.000000Z",
    updated_at: "2024-08-15T09:43:43.000000Z",
  },
  comments: [
    {
      comment_id: 9,
      comment: "12315",
      created_at: "2024-08-23T12:45:30.000000Z",
      updated_at: "2024-08-23T12:45:30.000000Z",
    },
    {
      comment_id: 10,
      comment: "165",
      created_at: "2024-08-23T12:46:21.000000Z",
      updated_at: "2024-08-23T12:46:21.000000Z",
    },
    {
      comment_id: 11,
      comment: "165",
      created_at: "2024-08-23T12:46:34.000000Z",
      updated_at: "2024-08-23T12:46:34.000000Z",
    },
    {
      comment_id: 12,
      comment: "165",
      created_at: "2024-08-23T12:46:44.000000Z",
      updated_at: "2024-08-23T12:46:44.000000Z",
    },
    {
      comment_id: 13,
      comment: "165",
      created_at: "2024-08-23T12:48:28.000000Z",
      updated_at: "2024-08-23T12:48:28.000000Z",
    },
    {
      comment_id: 14,
      comment: "165",
      created_at: "2024-08-23T14:05:05.000000Z",
      updated_at: "2024-08-23T14:05:05.000000Z",
    },
  ],
  card_details: [
    {
      id: 18,
      user_name: "mahmoud galal",
      description: " created this card.",
      user_name_desc: "mahmoud galal  created this card.",
      created_at: "2024-08-31 12:13:08",
    },
    {
      id: 19,
      user_name: "mahmoud galal",
      description: " updated this card.",
      user_name_desc: "mahmoud galal  updated this card.",
      created_at: "2024-08-31 12:13:34",
    },
    {
      id: 21,
      user_name: "mahmoud galal",
      description: "moved this card from list: Doing to list: Doing",
      user_name_desc:
        "mahmoud galal moved this card from list: Doing to list: Doing",
      created_at: "2024-08-31 12:14:06",
    },
    {
      id: 22,
      user_name: "mahmoud galal",
      description: "copied this card from list: Doing to list: done",
      user_name_desc:
        "mahmoud galal copied this card from list: Doing to list: done",
      created_at: "2024-08-31 12:14:12",
    },
  ],
};
const Card = React.memo(
  ({ card, onCardDelete, listId, board, show, setShow }) => {
    const [open, setOpen] = useState(false); // حالة المودال

    const [selectedFile, setSelectedFile] = useState([]);

    const [fullCover, setFullCover] = useState(false);
    const [cardCoverImg, setCardCoverImg] = useState(null);

    const cookies = Cookies.get("token");

    const onOpenModal = () => {
      setOpen(true);
    };
    const onCloseModal = () => setOpen(false);

    const handleDeleteCard = (id) => {
      onCardDelete(id);
      onCloseModal();
    };

    const [cardDetails, setcardDetails] = useState(data);

    useEffect(() => {
      const fetchcarddetails = async () => {
        try {
          // const { data } = await api({
          //   url: `cards/get-card/${card.id}`,
          //   headers: { Authorization: `Bearer ${cookies}` },
          // });
          // setcardDetails(data.data);
          // setSelectedFile(data?.files);
        } catch (err) {
          console.log(err);
        }
      };
      fetchcarddetails();
    }, [card.id]);

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (newText) => {
      setcardDetails((prev) => ({
        ...prev,
        text: newText,
      }));
    };

    // حفظ النص عند انتهاء التعديل
    const saveEdit = async () => {
      setIsEditing(false);
      // عند حفظ التعديل، يمكنك إضافة طلب API لحفظ التغيير إذا كان مطلوبًا
      try {
        // const response = await api({
        //   method: "POST",
        //   url: "cards/update",
        //   headers: { Authorization: `Bearer ${cookies}` },
        //   data: {
        //     card_id: card.id,
        //     text: cardDetails.text,
        //     the_list_id: listId,
        //   },
        // });
      } catch (error) {
        console.log(card.id);
        console.error("Error saving the updated text:", error);
      }
    };

    // التعامل مع الحدث عند الضغط على الأيقونة
    const handleEditClick = (e) => {
      e.stopPropagation(); // منع الحدث من الانتشار
      setIsEditing(true); // تفعيل وضع التعديل
    };

    // التعامل مع الحدث عند الضغط على الحقل
    const handleInputClick = (e) => {
      e.stopPropagation(); // منع الحدث من الانتشار عند الضغط على الحقل
    };

    return (
      <>
        <div className="item" onClick={onOpenModal}>
          {cardDetails.color ? (
            <div
              className="cover-image"
              style={{
                background: `${cardDetails.color}`, // استخدام الصورة كخلفية
                height: fullCover ? "80px" : "40px", // إذا كانت الصورة موجودة
              }}
            ></div>
          ) : cardCoverImg ? ( // إذا كان هناك رابط للصورة
            <div
              className="cover-image"
              style={{
                background: `url(${cardCoverImg})`, // استخدام الصورة كخلفية
                height: fullCover ? "80px" : "40px", // إذا كانت الصورة موجودة
              }}
            ></div>
          ) : cardDetails.photo ? (
            <div
              className="cover-image"
              style={{
                background: `url(https://back.alyoumsa.com/public/${cardDetails.photo})`, // استخدام الصورة كخلفية
                maxHeight: fullCover ? "240px " : "40px", // إذا كانت الصورة موجودة
                height: fullCover ? "240px " : "40px", // إذا كانت الصورة موجودة
              }}
            ></div>
          ) : (
            <></>
          )}
          <div className="card-text">
            {isEditing ? (
              <input
                type="text"
                value={cardDetails.text}
                onChange={(e) => handleEdit(e.target.value)} // تحديث القيمة عند التعديل
                onBlur={() => setIsEditing(false)} // حفظ التعديل عند فقدان التركيز
                onClick={handleInputClick} // إضافة stopPropagation هنا
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveEdit(); // حفظ التعديل عند الضغط على Enter
                  }
                }}
                autoFocus
              />
            ) : (
              <p>{cardDetails.text}</p>
            )}
            {/* أيقونة التعديل */}
            <MdOutlineEdit onClick={handleEditClick} />
          </div>
        </div>
        <CardDetails
          onCloseModal={onCloseModal}
          listId={listId}
          open={open}
          cardDetails={cardDetails}
          setcardDetails={setcardDetails}
          onDeleteCard={handleDeleteCard}
          board={board}
          files={selectedFile}
          setSelectedFile={setSelectedFile}
          setFullCover={setFullCover}
          setCardCoverImg={setCardCoverImg}
          cardCoverImg={cardCoverImg}
        />
      </>
    );
  }
);

// Set displayName for debugging purposes
Card.displayName = "CardComponent";

export default Card;

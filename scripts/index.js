const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Val Thorens",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "Restaurant terrace",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "An outdoor cafe",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "A very long bridge, over the forest and through the trees",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "Tunnel with morning light",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Mountain house",
  },
];

const profileEditButton = document.querySelector(".profile__edit");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newLink = document.querySelector(".profile__name");
const newCaption = document.querySelector(".profile__description");
const newPost = document.querySelector(".profile__add-btn");

const cardModal = document.querySelector("#add-card-modal");
const previewClose = document.querySelector(".modal");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardSubmitBtn = cardModal.querySelector(".modal__button");
const closePreview = document.querySelector(".modal__content");

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#add-card-modal");
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const linkInput = newPostModal.querySelector("#add-card-link-input");
const captionInput = newPostModal.querySelector("#add-card-name-input");
const profileCloseButton = document.querySelector(".modal__close-btn");
const editFormElement = editProfileModal.querySelector(".modal__form");

const closeProfileModal = document.querySelector("#edit-profile-modal");
const closePostModal = document.querySelector("#add-card-modal");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardForm = cardModal.querySelector(".modal__form");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");

function getCardElement(data) {
  //console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode("true");

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const removebtn = cardElement.querySelector(".card__delete-btn");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.alt;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  removebtn.addEventListener("click", () => {
    console.log("deleted....");
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.alt = data.alt;
    previewModal.focus();
  });

  return cardElement;
  x;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  console.log(cardNameInput.value);
  console.log(cardLinkInput.value);
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn);
  closeModal(newPostModal);
}

previewModal.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(previewModal);
  }
});

document.addEventListener("click", (e) => {
  if (!closePreview.contains(e.target)) {
    previewModal.classList.add("modal_hide");
  }
});

profileEditButton.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  resetValidation(editFormElement, [
    editModalNameInput,
    editModalDescriptionInput,
  ]);
  openModal(editProfileModal);
});
newPost.addEventListener("click", () => {
  openModal(newPostModal);
});
profileCloseButton.addEventListener("click", () => {
  closeModal(closeProfileModal);
});
cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});
previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});
editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

//for (let i = 0; i < initialCards.length; i++) {
//const cardElement = getCardElement(initiaxlCards[i]);
//cardsList.append(cardElement);
//}

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

"use strict";


/* =========================================================
   CONF-007 — BADGE PROTOCOL

   EDIT ALL CLIENT INFORMATION HERE ONLY
========================================================= */

const CONFERENCE = {

  name:
    "AI Frontiers 2027",

  shortName:
    "AIF 27",

  tagline:
    "Intelligence in Motion.",

  organizer:
    "Future Systems Lab",


  startAt:
    "2027-10-21T09:00:00+03:00",

  endAt:
    "2027-10-21T17:30:00+03:00",

  timeZone:
    "Asia/Baghdad",


  venue:
    "Baghdad Digital Innovation Center",

  city:
    "Baghdad",

  country:
    "Iraq",


  mapsUrl:
    "",


  registrationUrl:
    "https://example.com/register",


  websiteUrl:
    "https://example.com",


  shareUrl:
    "",


  badgeCode:
    "AIF-27-001",


  speakers: [

    {
      name:
        "Dr. Maya Kareem",

      role:
        "AI Research Director",

      organization:
        "Future Systems Lab",

      image:
        "speaker-01.jpg",

      alt:
        "Portrait of Dr. Maya Kareem"
    },

    {
      name:
        "Omar Nasser",

      role:
        "Founder & AI Product Lead",

      organization:
        "Vector Labs",

      image:
        "speaker-02.jpg",

      alt:
        "Portrait of Omar Nasser"
    },

    {
      name:
        "Lina Haddad",

      role:
        "Innovation Strategist",

      organization:
        "Next Form Institute",

      image:
        "speaker-03.jpg",

      alt:
        "Portrait of Lina Haddad"
    }

  ],


  sessions: [

    {
      code:
        "AI-01",

      time:
        "10:00",

      type:
        "Keynote",

      title:
        "Beyond the Model",

      description:
        "What matters when artificial intelligence moves from demonstration to real systems."
    },

    {
      code:
        "AI-02",

      time:
        "12:30",

      type:
        "Founder Session",

      title:
        "Products That Learn",

      description:
        "A practical conversation on building useful AI products around human needs."
    },

    {
      code:
        "AI-03",

      time:
        "15:00",

      type:
        "Innovation Panel",

      title:
        "The Next Interface",

      description:
        "How intelligent interfaces may reshape the relationship between people and technology."
    }

  ]

};



/* =========================================================
   DATE OBJECTS
========================================================= */

const START_DATE =
  new Date(
    CONFERENCE.startAt
  );


const END_DATE =
  new Date(
    CONFERENCE.endAt
  );


let countdownTimer =
  null;


let currentBadgeMode =
  0;


/* =========================================================
   BADGE MODES
========================================================= */

const BADGE_MODES = [
  "identity",
  "date",
  "speakers",
  "venue",
  "countdown"
];



/* =========================================================
   ELEMENTS
========================================================= */

const elements = {

  conferenceBadge:
    document.getElementById(
      "conferenceBadge"
    ),

  badgeContent:
    document.getElementById(
      "badgeContent"
    ),

  badgeStatus:
    document.getElementById(
      "badgeStatus"
    ),

  badgeMode:
    document.getElementById(
      "badgeMode"
    ),

  badgeCode:
    document.getElementById(
      "badgeCode"
    ),


  accessList:
    document.getElementById(
      "accessList"
    ),


  locationCity:
    document.getElementById(
      "locationCity"
    ),

  locationCountry:
    document.getElementById(
      "locationCountry"
    ),


  mapButton:
    document.getElementById(
      "mapButton"
    ),

  secondaryMapButton:
    document.getElementById(
      "secondaryMapButton"
    ),

  registerButton:
    document.getElementById(
      "registerButton"
    ),

  websiteButton:
    document.getElementById(
      "websiteButton"
    ),


  calendarButton:
    document.getElementById(
      "calendarButton"
    ),

  shareButton:
    document.getElementById(
      "shareButton"
    ),

  topShareButton:
    document.getElementById(
      "topShareButton"
    ),


  footerYear:
    document.getElementById(
      "footerYear"
    ),

  statusMessage:
    document.getElementById(
      "statusMessage"
    )

};



/* =========================================================
   POPULATE
========================================================= */

function populateConference() {

  document
    .querySelectorAll(
      "[data-field]"
    )
    .forEach(
      element => {

        const field =
          element.dataset.field;


        if (
          Object.prototype.hasOwnProperty.call(
            CONFERENCE,
            field
          )
        ) {

          element.textContent =
            CONFERENCE[field];

        }

      }
    );


  elements.badgeCode.textContent =
    CONFERENCE.badgeCode;


  elements.locationCity.textContent =
    CONFERENCE.city.toUpperCase();


  elements.locationCountry.textContent =
    CONFERENCE.country;


  elements.footerYear.textContent =
    START_DATE.getFullYear();


  configureLinks();

  updateMetadata();

  addStructuredData();

}



/* =========================================================
   BADGE
========================================================= */

function setupBadge() {

  const buttons =
    Array.from(
      document.querySelectorAll(
        ".badge-nav__button"
      )
    );


  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const index =
            Number(
              button.dataset.modeIndex
            );


          changeBadgeMode(
            index,
            buttons
          );

        }
      );

    }
  );


  setupBadgeSwipe(
    buttons
  );


  elements.conferenceBadge
    .addEventListener(
      "keydown",
      event => {

        if (
          event.key ===
          "ArrowDown" ||
          event.key ===
          "ArrowRight"
        ) {

          event.preventDefault();

          changeBadgeMode(
            currentBadgeMode + 1,
            buttons
          );

        }


        if (
          event.key ===
          "ArrowUp" ||
          event.key ===
          "ArrowLeft"
        ) {

          event.preventDefault();

          changeBadgeMode(
            currentBadgeMode - 1,
            buttons
          );

        }

      }
    );


  renderBadgeMode(
    currentBadgeMode
  );

}



/* =========================================================
   SWIPE
========================================================= */

function setupBadgeSwipe(
  buttons
) {

  let startY =
    null;


  let currentY =
    null;


  const badge =
    elements.conferenceBadge;


  badge.addEventListener(
    "pointerdown",
    event => {

      startY =
        event.clientY;


      currentY =
        event.clientY;


      badge.classList.add(
        "is-swiping"
      );

    }
  );


  badge.addEventListener(
    "pointermove",
    event => {

      if (
        startY === null
      ) {
        return;
      }


      currentY =
        event.clientY;

    }
  );


  badge.addEventListener(
    "pointerup",
    finishSwipe
  );


  badge.addEventListener(
    "pointercancel",
    finishSwipe
  );


  function finishSwipe() {

    badge.classList.remove(
      "is-swiping"
    );


    if (
      startY === null ||
      currentY === null
    ) {

      startY = null;
      currentY = null;

      return;

    }


    const distance =
      currentY -
      startY;


    if (
      Math.abs(distance) >=
      45
    ) {

      /*
        Swipe up = next
        Swipe down = previous
      */

      if (
        distance < 0
      ) {

        changeBadgeMode(
          currentBadgeMode + 1,
          buttons
        );

      } else {

        changeBadgeMode(
          currentBadgeMode - 1,
          buttons
        );

      }

    }


    startY =
      null;


    currentY =
      null;

  }

}



/* =========================================================
   CHANGE MODE
========================================================= */

function changeBadgeMode(
  index,
  buttons
) {

  const total =
    BADGE_MODES.length;


  const normalizedIndex =
    (
      index +
      total
    ) %
    total;


  currentBadgeMode =
    normalizedIndex;


  buttons.forEach(
    (button, buttonIndex) => {

      const active =
        buttonIndex ===
        normalizedIndex;


      button.classList.toggle(
        "is-active",
        active
      );


      button.setAttribute(
        "aria-selected",
        String(active)
      );

    }
  );


  if (
    prefersReducedMotion()
  ) {

    renderBadgeMode(
      normalizedIndex
    );

    return;

  }


  elements.badgeContent
    .classList
    .add(
      "is-changing"
    );


  window.setTimeout(
    () => {

      renderBadgeMode(
        normalizedIndex
      );


      elements.badgeContent
        .classList
        .remove(
          "is-changing"
        );

    },
    170
  );

}



/* =========================================================
   RENDER BADGE
========================================================= */

function renderBadgeMode(index) {

  const mode =
    BADGE_MODES[index];


  elements.conferenceBadge
    .dataset
    .mode =
      mode;


  const modeNumber =
    String(index + 1)
      .padStart(
        2,
        "0"
      );


  switch (mode) {

    case "identity":

      elements.badgeStatus.textContent =
        "ACCESS GRANTED";


      elements.badgeMode.textContent =
        `${modeNumber} / IDENTITY`;


      renderIdentityBadge();

      break;


    case "date":

      elements.badgeStatus.textContent =
        "DATE VERIFIED";


      elements.badgeMode.textContent =
        `${modeNumber} / DATE`;


      renderDateBadge();

      break;


    case "speakers":

      elements.badgeStatus.textContent =
        "PEOPLE ACCESS";


      elements.badgeMode.textContent =
        `${modeNumber} / SPEAKERS`;


      renderSpeakersBadge();

      break;


    case "venue":

      elements.badgeStatus.textContent =
        "LOCATION VERIFIED";


      elements.badgeMode.textContent =
        `${modeNumber} / VENUE`;


      renderVenueBadge();

      break;


    case "countdown":

      elements.badgeStatus.textContent =
        "ACCESS OPENS IN";


      elements.badgeMode.textContent =
        `${modeNumber} / COUNTDOWN`;


      renderCountdownBadge();

      break;

  }

}



/* =========================================================
   IDENTITY MODE
========================================================= */

function renderIdentityBadge() {

  elements.badgeContent.innerHTML = `

    <div class="badge-identity">

      <p class="badge-identity__eyebrow">
        CONFERENCE ACCESS
      </p>

      <h3>
        ${escapeHTML(CONFERENCE.name)}
      </h3>

      <p class="badge-identity__tagline">
        ${escapeHTML(CONFERENCE.tagline)}
      </p>

      <div class="badge-organizer">

        <span>
          ORGANIZED BY
        </span>

        <strong>
          ${escapeHTML(CONFERENCE.organizer)}
        </strong>

      </div>

    </div>

  `;

}



/* =========================================================
   DATE MODE
========================================================= */

function renderDateBadge() {

  const day =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          CONFERENCE.timeZone,

        day:
          "2-digit"
      }
    ).format(
      START_DATE
    );


  const month =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          CONFERENCE.timeZone,

        month:
          "long"
      }
    ).format(
      START_DATE
    );


  const year =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          CONFERENCE.timeZone,

        year:
          "numeric"
      }
    ).format(
      START_DATE
    );


  const startTime =
    formatTime(
      START_DATE
    );


  const endTime =
    formatTime(
      END_DATE
    );


  elements.badgeContent.innerHTML = `

    <div class="badge-date">

      <span class="badge-date__label">
        CONFERENCE DATE
      </span>

      <strong class="badge-date__day">
        ${escapeHTML(day)}
      </strong>

      <h3>
        ${escapeHTML(month)} ${escapeHTML(year)}
      </h3>

      <p>
        ${escapeHTML(startTime)} — ${escapeHTML(endTime)}
      </p>

    </div>

  `;

}



/* =========================================================
   SPEAKERS MODE
========================================================= */

function renderSpeakersBadge() {

  const speakersHTML =
    CONFERENCE.speakers

      .map(
        speaker => `

          <div class="badge-speaker">

            <img
              src="${escapeHTML(speaker.image)}"
              alt="${escapeHTML(speaker.alt)}"
              loading="lazy"
              decoding="async"
            >

            <div>

              <h4>
                ${escapeHTML(speaker.name)}
              </h4>

              <p>
                ${escapeHTML(speaker.role)} ·
                ${escapeHTML(speaker.organization)}
              </p>

            </div>

          </div>

        `
      )

      .join("");


  elements.badgeContent.innerHTML = `

    <div class="badge-speakers">

      <p class="badge-speakers__label">
        FEATURED PEOPLE
      </p>

      ${speakersHTML}

    </div>

  `;

}



/* =========================================================
   VENUE MODE
========================================================= */

function renderVenueBadge() {

  elements.badgeContent.innerHTML = `

    <div class="badge-venue">

      <span class="badge-venue__label">
        LOCATION ACCESS
      </span>

      <p class="badge-venue__city">
        ${escapeHTML(CONFERENCE.city)}
      </p>

      <h3>
        ${escapeHTML(CONFERENCE.venue)}
      </h3>

      <p>
        ${escapeHTML(CONFERENCE.country)}
      </p>

    </div>

  `;

}



/* =========================================================
   COUNTDOWN MODE
========================================================= */

function renderCountdownBadge() {

  const values =
    getCountdownValues();


  elements.badgeContent.innerHTML = `

    <div class="badge-countdown">

      <span class="badge-countdown__label">
        ACCESS OPENS IN
      </span>

      <strong
        class="badge-countdown__days"
        id="badgeCountdownDays"
      >
        ${pad(values.days)}
      </strong>

      <div class="badge-countdown__grid">

        <div class="badge-countdown__unit">

          <span>
            HOURS
          </span>

          <strong id="badgeCountdownHours">
            ${pad(values.hours)}
          </strong>

        </div>


        <div class="badge-countdown__unit">

          <span>
            MIN
          </span>

          <strong id="badgeCountdownMinutes">
            ${pad(values.minutes)}
          </strong>

        </div>


        <div class="badge-countdown__unit">

          <span>
            SEC
          </span>

          <strong id="badgeCountdownSeconds">
            ${pad(values.seconds)}
          </strong>

        </div>

      </div>

    </div>

  `;

}



/* =========================================================
   SESSION ACCESS LIST
========================================================= */

function renderSessions() {

  elements.accessList.innerHTML =
    "";


  CONFERENCE.sessions.forEach(
    session => {

      const article =
        document.createElement(
          "article"
        );


      article.className =
        "access-item reveal";


      article.innerHTML = `

        <div class="access-code">

          <span>
            ACCESS
          </span>

          <strong>
            ${escapeHTML(session.code)}
          </strong>

        </div>


        <div>

          <p class="access-item__type">
            ${escapeHTML(session.time)} / ${escapeHTML(session.type)}
          </p>

          <h3>
            ${escapeHTML(session.title)}
          </h3>

          <p>
            ${escapeHTML(session.description)}
          </p>

        </div>

      `;


      elements.accessList
        .appendChild(
          article
        );

    }
  );

}



/* =========================================================
   COUNTDOWN
========================================================= */

function startCountdown() {

  updateCountdown();


  countdownTimer =
    window.setInterval(
      updateCountdown,
      1000
    );

}



function getCountdownValues() {

  const now =
    new Date();


  const difference =
    Math.max(
      0,
      START_DATE.getTime() -
      now.getTime()
    );


  const totalSeconds =
    Math.floor(
      difference / 1000
    );


  return {

    days:
      Math.floor(
        totalSeconds / 86400
      ),

    hours:
      Math.floor(
        (
          totalSeconds %
          86400
        ) /
        3600
      ),

    minutes:
      Math.floor(
        (
          totalSeconds %
          3600
        ) /
        60
      ),

    seconds:
      totalSeconds % 60

  };

}



function updateCountdown() {

  const now =
    new Date();


  if (
    now.getTime() >=
    START_DATE.getTime()
  ) {

    if (
      now.getTime() >
      END_DATE.getTime()
    ) {

      elements.badgeStatus.textContent =
        currentBadgeMode === 4
          ? "EVENT COMPLETE"
          : elements.badgeStatus.textContent;

    } else {

      elements.badgeStatus.textContent =
        currentBadgeMode === 4
          ? "EVENT LIVE"
          : elements.badgeStatus.textContent;

    }

  }


  if (
    currentBadgeMode !== 4
  ) {
    return;
  }


  const values =
    getCountdownValues();


  const days =
    document.getElementById(
      "badgeCountdownDays"
    );


  const hours =
    document.getElementById(
      "badgeCountdownHours"
    );


  const minutes =
    document.getElementById(
      "badgeCountdownMinutes"
    );


  const seconds =
    document.getElementById(
      "badgeCountdownSeconds"
    );


  if (days) {
    days.textContent =
      pad(values.days);
  }


  if (hours) {
    hours.textContent =
      pad(values.hours);
  }


  if (minutes) {
    minutes.textContent =
      pad(values.minutes);
  }


  if (seconds) {
    seconds.textContent =
      pad(values.seconds);
  }

}



/* =========================================================
   DATE FORMAT
========================================================= */

function formatTime(date) {

  return new Intl.DateTimeFormat(
    "en-US",
    {
      timeZone:
        CONFERENCE.timeZone,

      hour:
        "numeric",

      minute:
        "2-digit",

      hour12:
        true
    }
  ).format(
    date
  );

}



/* =========================================================
   MAP
========================================================= */

function getMapUrl() {

  const custom =
    CONFERENCE.mapsUrl?.trim();


  if (custom) {
    return custom;
  }


  const query =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  return (
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(query)
  );

}



/* =========================================================
   LINKS
========================================================= */

function configureLinks() {

  const mapUrl =
    getMapUrl();


  elements.mapButton.href =
    mapUrl;


  elements.secondaryMapButton.href =
    mapUrl;


  const registration =
    CONFERENCE.registrationUrl?.trim();


  if (registration) {

    elements.registerButton.href =
      registration;

  } else {

    elements.registerButton.hidden =
      true;

  }


  const website =
    CONFERENCE.websiteUrl?.trim();


  if (website) {

    elements.websiteButton.href =
      website;

  } else {

    elements.websiteButton.hidden =
      true;

  }

}



/* =========================================================
   CALENDAR / ICS
========================================================= */

function downloadCalendar() {

  const location =
    [
      CONFERENCE.venue,
      CONFERENCE.city,
      CONFERENCE.country
    ]
      .filter(Boolean)
      .join(", ");


  const invitationUrl =
    getShareUrl();


  const description =
    [
      CONFERENCE.tagline,

      CONFERENCE.websiteUrl
        ? `Website: ${CONFERENCE.websiteUrl}`
        : "",

      invitationUrl
        ? `Invitation: ${invitationUrl}`
        : ""
    ]
      .filter(Boolean)
      .join("\\n");


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Badge Protocol Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:${createUID()}
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(START_DATE)}
DTEND:${formatICSDate(END_DATE)}
SUMMARY:${escapeICS(CONFERENCE.name)}
DESCRIPTION:${escapeICS(description)}
LOCATION:${escapeICS(location)}
URL:${escapeICS(CONFERENCE.websiteUrl || invitationUrl)}
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    `${slugify(CONFERENCE.shortName)}.ics`;


  document.body.appendChild(
    link
  );


  link.click();

  link.remove();


  URL.revokeObjectURL(
    url
  );


  announce(
    "Calendar file downloaded."
  );

}



/* =========================================================
   ICS
========================================================= */

function formatICSDate(date) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}Z$/,
      "Z"
    );

}



function createUID() {

  return (
    `${slugify(CONFERENCE.shortName)}` +
    `-${START_DATE.getTime()}` +
    "@badge-protocol"
  );

}



function escapeICS(value = "") {

  return String(value)

    .replace(
      /\\/g,
      "\\\\"
    )

    .replace(
      /\n/g,
      "\\n"
    )

    .replace(
      /,/g,
      "\\,"
    )

    .replace(
      /;/g,
      "\\;"
    );

}



/* =========================================================
   SHARE
========================================================= */

async function shareInvitation() {

  const data = {

    title:
      CONFERENCE.name,

    text:
      `${CONFERENCE.name} — ${CONFERENCE.tagline}`,

    url:
      getShareUrl()

  };


  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        data
      );


      announce(
        "Invitation shared."
      );


      return;

    } catch (error) {

      if (
        error.name ===
        "AbortError"
      ) {
        return;
      }

    }

  }


  await copyInvitationLink();

}



/* =========================================================
   COPY
========================================================= */

async function copyInvitationLink() {

  const url =
    getShareUrl();


  try {

    await navigator.clipboard
      .writeText(
        url
      );


    announce(
      "Invitation link copied."
    );

  } catch (error) {

    fallbackCopy(
      url
    );

  }

}



function fallbackCopy(text) {

  const textarea =
    document.createElement(
      "textarea"
    );


  textarea.value =
    text;


  textarea.setAttribute(
    "readonly",
    ""
  );


  textarea.style.position =
    "fixed";


  textarea.style.opacity =
    "0";


  document.body.appendChild(
    textarea
  );


  textarea.select();


  try {

    document.execCommand(
      "copy"
    );


    announce(
      "Invitation link copied."
    );

  } catch (error) {

    announce(
      "Unable to copy link automatically."
    );

  }


  textarea.remove();

}



/* =========================================================
   SHARE URL
========================================================= */

function getShareUrl() {

  const custom =
    CONFERENCE.shareUrl?.trim();


  if (custom) {
    return custom;
  }


  return window.location.href;

}



/* =========================================================
   ACTIONS
========================================================= */

function setupActions() {

  elements.calendarButton
    .addEventListener(
      "click",
      downloadCalendar
    );


  elements.shareButton
    .addEventListener(
      "click",
      shareInvitation
    );


  elements.topShareButton
    .addEventListener(
      "click",
      shareInvitation
    );

}



/* =========================================================
   REVEAL
========================================================= */

function setupRevealObserver() {

  const items =
    document.querySelectorAll(
      ".reveal"
    );


  if (
    prefersReducedMotion()
  ) {

    items.forEach(
      item =>
        item.classList.add(
          "is-visible"
        )
    );

    return;

  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (
              !entry.isIntersecting
            ) {
              return;
            }


            entry.target
              .classList
              .add(
                "is-visible"
              );


            observer.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold:
          0.12,

        rootMargin:
          "0px 0px -7% 0px"
      }
    );


  items.forEach(
    item =>
      observer.observe(
        item
      )
  );

}



/* =========================================================
   METADATA
========================================================= */

function updateMetadata() {

  document.title =
    CONFERENCE.name;


  const description =
    `${CONFERENCE.name} — ${CONFERENCE.tagline}`;


  updateMeta(
    'meta[name="description"]',
    description
  );


  updateMeta(
    'meta[property="og:title"]',
    CONFERENCE.name
  );


  updateMeta(
    'meta[property="og:description"]',
    CONFERENCE.tagline
  );


  updateMeta(
    'meta[property="og:url"]',
    getShareUrl()
  );


  updateMeta(
    'meta[name="twitter:title"]',
    CONFERENCE.name
  );


  updateMeta(
    'meta[name="twitter:description"]',
    CONFERENCE.tagline
  );

}



function updateMeta(
  selector,
  content
) {

  const element =
    document.querySelector(
      selector
    );


  if (!element) {
    return;
  }


  element.setAttribute(
    "content",
    content
  );

}



/* =========================================================
   STRUCTURED DATA
========================================================= */

function addStructuredData() {

  const data = {

    "@context":
      "https://schema.org",

    "@type":
      "Event",

    name:
      CONFERENCE.name,

    description:
      CONFERENCE.tagline,

    startDate:
      CONFERENCE.startAt,

    endDate:
      CONFERENCE.endAt,

    eventStatus:
      "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    location: {

      "@type":
        "Place",

      name:
        CONFERENCE.venue,

      address: {

        "@type":
          "PostalAddress",

        addressLocality:
          CONFERENCE.city,

        addressCountry:
          CONFERENCE.country

      }

    },

    organizer: {

      "@type":
        "Organization",

      name:
        CONFERENCE.organizer,

      url:
        CONFERENCE.websiteUrl ||
        undefined

    },

    url:
      getShareUrl()

  };


  const script =
    document.createElement(
      "script"
    );


  script.type =
    "application/ld+json";


  script.textContent =
    JSON.stringify(
      data
    );


  document.head.appendChild(
    script
  );

}



/* =========================================================
   HELPERS
========================================================= */

function pad(number) {

  return String(number)
    .padStart(
      2,
      "0"
    );

}



function slugify(value = "") {

  return String(value)

    .toLowerCase()

    .trim()

    .replace(
      /[^a-z0-9]+/g,
      "-"
    )

    .replace(
      /^-+|-+$/g,
      ""
    );

}



function escapeHTML(value = "") {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}



function announce(message) {

  elements.statusMessage.textContent =
    "";


  window.setTimeout(
    () => {

      elements.statusMessage.textContent =
        message;

    },
    30
  );

}



function prefersReducedMotion() {

  return window
    .matchMedia(
      "(prefers-reduced-motion: reduce)"
    )
    .matches;

}



/* =========================================================
   INIT
========================================================= */

function init() {

  populateConference();

  renderSessions();

  setupBadge();

  setupActions();

  setupRevealObserver();

  startCountdown();

}



document.addEventListener(
  "DOMContentLoaded",
  init
);

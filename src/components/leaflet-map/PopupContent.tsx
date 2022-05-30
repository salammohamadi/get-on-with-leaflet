import { useAppSelector } from '../../store/app/hooks';
import { useDispatch } from 'react-redux';

import { toggleModal } from '../../store/slices/modalPanelSlice';
import { retrieveData } from '../../store/slices/retrieveFormDataSlice';
import { togglePopup } from '../../store/slices/leafletMapSlice';

import communereLogo from '../../assets/logos/communereLogo.svg';

import classes from './popupContent.module.css';
import { toggleEditButtonClicked } from '../../store/slices/ShareLocationFormSlice';

const PopupContent: React.FC = () => {
  const sharedLocations = useAppSelector(state => state.sharedLocations);
  const sharedLocationIsSaved = useAppSelector(
    state => state.form.sharedLocationSaved
  );
  const editButtonIsClicked = useAppSelector(
    state => state.form.editButtonClicked
  );

  const dispatch = useDispatch();

  const popupEditClickHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    dispatch(toggleEditButtonClicked());

    dispatch(togglePopup());

    const locationId = event.currentTarget
      .closest('.location-popup-container')
      ?.querySelector('.popup-location')
      ?.getAttribute('data-id');

    sharedLocations.forEach(location => {
      console.log(location);
      if (location.id === locationId) {
        dispatch(
          retrieveData({
            locationClicked: location.locationClicked,
            locationName: location.locationName,
            locationType: location.locationType,
            locationLogo: location.locationLogo,
            locationLat: location.locationLatLang.lat,
            locationLng: location.locationLatLang.lng,
            locationId: location.id,
          })
        );
      }
    });

    dispatch(toggleModal());
  };

  const popupCloseClickHandler = () => {
    dispatch(togglePopup());
  };

  return (
    <div
      className={`${classes['location-popup-container']} location-popup-container`}
    >
      <header className={classes['popup-header']}>Location Details</header>
      {!editButtonIsClicked && !sharedLocationIsSaved && (
        <p className={classes['add-popup-location']}>
          Not Shared Location Yet !
        </p>
      )}
      {sharedLocationIsSaved &&
        sharedLocations.map(
          location =>
            location.locationClicked && (
              <div
                className={`${classes['popup-location']} popup-location`}
                data-id={location.id}
              >
                <h2 className={classes['popup-location-item__name']}>
                  {location.locationName}
                </h2>
                <div className={classes['popup-location-item__type']}>
                  {location.locationType}
                </div>
                <div>
                  <span className={classes['popup-location-item__logo']}>
                    <img
                      src={communereLogo}
                      alt={` ${location.locationName} logo`}
                    />
                  </span>
                </div>
              </div>
            )
        )}

      <button
        className={`${classes['close-popup']} ${classes.btn}`}
        onClick={popupCloseClickHandler}
      >
        Close
      </button>

      <button
        className={`${classes['edit-popup']} ${classes.btn}`}
        onClick={popupEditClickHandler}
      >
        Edit
      </button>
    </div>
  );
};

export default PopupContent;

import {app} from '@src/helpers/constants';
const style = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  titleContainer: {
    flex: 1,
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    margin: 10,
    marginTop: 30,
    paddingLeft: 20,
    justifyContent: 'space-between',
    opacity: 1,
    zIndex: 1,
  },
  titleText: {
    right: 0,
    fontFamily: app.primaryFontMedium,
    fontSize: 20,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  headerContainer: {
    flex: 1,
  },
  headerTitle: {
    flex: 0.12,
  },
  imageOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    top: 0,
    zIndex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 0.3,
    resizeMode: 'cover',
  },
  salesContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
};

export default style;

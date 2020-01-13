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
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 1,
    zIndex: 1,
  },
  titleText: {
    fontFamily: app.primaryFontBold,
    fontSize: 25,
    right: 0,
    color: 'rgba(255,255,255,0.9)',
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
    elevation: 5,
  },
};

export default style;

import {app} from '@src/helpers/constants';

const style = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    width: '100%',
    paddingTop: 30,
    padding: 20,
    backgroundColor: app.primaryColorDarker,
    zIndex: -1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerInfo: {
    flex: 1,
    height: 150,
    justifyContent: 'space-evenly',
    marginLeft: 35,
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerInfoText: {
    fontFamily: app.primaryFontMedium,
    color: 'rgba(255,255,255,0.8)',
  },
  headerInfoButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    padding: 5,
    height: 40,
    maxHeight: 50,
  },
  headerInfoButtonText: {
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  headerMiscIcon: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    maxHeight: '85%',
    width: '90%',
    marginTop: -30,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    borderColor: '#ddd',
    shadowRadius: 3,
    elevation: 1,
    zIndex: -1,
  },
  contentSection: {
    paddingTop: 10,
    marginBottom: 10,
  },
  contentTitle: {
    color: 'rgba(0,0,0,0.8)',
    fontFamily: app.primaryFontBold,
  },
  contentSubTitle: {
    fontSize: 14,
  },
  contentSubTitleContainer: {
    paddingTop: 10,
  },
  contentText: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.7)',
    fontFamily: app.primaryFontMedium,
    paddingTop: 5,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export default style;

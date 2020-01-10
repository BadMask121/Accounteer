import {app} from '@src/helpers/constants';

const style = {
  businessPurchaseContainer: {
    flex: 3,
    backgroundColor: app.primaryColorLight,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  businessPurchaseContainerTitle: {
    fontSize: 30,
    color: 'rgba(255,255,255, 0.8)',
    fontFamily: app.primaryFontMedium,
  },
  businessPurchaseContainerAmount: {
    fontSize: 30,
    color: 'rgba(218,202,255, 0.5)',
    fontFamily: app.primaryFontRegular,
  },
};

export default style;

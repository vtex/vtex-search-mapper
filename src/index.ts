import {
  BiggySearchProduct,
  BiggySearchResult,
  BiggySearchSku,
  BiggySkuSeller,
} from './biggy'
import { CatalogApiProduct, CatalogApiSku, CatalogApiSeller } from './catalog'
import { last, getDateStringFromTimestamp } from './utils'

function biggyProductBaseInfoToCatalog(
  product: BiggySearchProduct
): CatalogApiProduct {
  return {
    productId: product.id,
    productName: product.name,
    brand: product.brand,
    brandId: parseInt(product.brandId, 10),
    brandImageUrl: null, // TODO: Biggy still don't have this
    linkText: product.link,
    productReference: product.reference,
    categoryId: last(product.categoryIds, ''),
    productTitle: product.name,
    description: product.description,
    metaTagDescription: product.description,
    releaseDate: getDateStringFromTimestamp(product.release),
    clusterHighlights: product.clusterHighlights,
    productClusters: {}, // productclusternames em textAttributes
    searchableClusters: {},
    categories: [], // category-1 e category-2 em textAttributes e ir acumulando: ['/Moda Masculina/Camisas/', '/Moda Masculina/']
    categoriesIds: [], // usar categoryIds e ir acumulando: ['/1000083/1000093/', '/1000083/']
    link: product.url, // Warning: for now this is a breaking change since it doesn't contain the domain on the url

    // from: ...JSON.parse(specificationGroups)
    // Especificações: ['Modelagem', 'Marca', 'Cor', 'Material'],
    // Especificações2: ['Ocasião', 'Mundo', 'Destaque', 'Pirâmide', 'Tendência'],

    // Pegar as keys em product.productSpecifications e depois ir em textAttributes filtrando por labelKey e pegando o labelValue
    // Modelagem: ['Manga Longa', 'Comfort'],
    // Marca: ['Angelo Lítrico'],
    // Cor: ['Azul'],
    // Material: ['Algodao', 'Poliéster'],
    // Ocasião: ['Trabalho'],
    // Mundo: ['Business'],
    // Destaque: ['Padrao'],
    // Pirâmide: ['A'],
    // Tendência: ['Bolso'],

    allSpecifications: product.productSpecifications,
    allSpecificationsGroups: [], // JSON.parse(specificationGroups) keys
    items: [], // get from product.skus
    skuSpecifications: [],
  }
}

function convertFromBiggySellerAndSkuToCatalogApiSeller(
  seller: BiggySkuSeller,
  sku: BiggySearchSku
): CatalogApiSeller {
  // Biggy:
  const biggySku = {
    reference: '7591812',
    idWithSplit: '2018619',
    policies: [
      { id: '8', sellers: [{ name: 'CeA', tax: 0, id: '1' }] },
      {
        id: '9',
        sellers: [
          { oldPrice: 0, price: 0, name: 'CeA', tax: 0, id: '1', stock: 0 },
        ],
      },
      { id: '5', sellers: [{ name: 'CeA', tax: 0, id: '1' }] },
      { id: '1', sellers: [{ name: 'CeA', tax: 0, id: '1' }] },
      { id: '2', sellers: [{ name: 'CeA', tax: 0, id: '1' }] },
      { id: '7', sellers: [{ name: 'CeA', tax: 0, id: '1' }] },
      { id: '3', sellers: [{ name: 'CeA', tax: 0, id: '1' }] },
    ],
    attributes: [
      { value: 'Azul', key: 'Cor' },
      { value: '1', key: 'Tamanho' },
    ],
    id: '2018619',
    sellers: [{ name: 'CeA', tax: 0, id: '1' }],
  }

  const newSeller: CatalogApiSeller = {
    sellerId: '1',
    sellerName: 'CeA',
    addToCartLink:
      'https://cea.myvtex.com/checkout/cart/add?sku=2018619&qty=1&seller=1&sc=1&price=6999&cv=738ceac6b96b3f79ee3a4faf3c1d9070_&sc=1',
    sellerDefault: true,
    commertialOffer: {
      DeliverySlaSamplesPerRegion: {
        '0': { DeliverySlaPerTypes: [], Region: null },
      },
      Installments: [
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Visa',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Visa à vista',
        },
        {
          Value: 34.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 2,
          PaymentSystemName: 'Visa',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Visa 2 vezes sem juros',
        },
        {
          Value: 23.33,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 3,
          PaymentSystemName: 'Visa',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Visa 3 vezes sem juros',
        },
        {
          Value: 17.49,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 4,
          PaymentSystemName: 'Visa',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Visa 4 vezes sem juros',
        },
        {
          Value: 13.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 5,
          PaymentSystemName: 'Visa',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Visa 5 vezes sem juros',
        },
        {
          Value: 11.66,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 6,
          PaymentSystemName: 'Visa',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Visa 6 vezes sem juros',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Mastercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Mastercard à vista',
        },
        {
          Value: 34.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 2,
          PaymentSystemName: 'Mastercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Mastercard 2 vezes sem juros',
        },
        {
          Value: 23.33,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 3,
          PaymentSystemName: 'Mastercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Mastercard 3 vezes sem juros',
        },
        {
          Value: 17.49,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 4,
          PaymentSystemName: 'Mastercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Mastercard 4 vezes sem juros',
        },
        {
          Value: 13.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 5,
          PaymentSystemName: 'Mastercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Mastercard 5 vezes sem juros',
        },
        {
          Value: 11.66,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 6,
          PaymentSystemName: 'Mastercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Mastercard 6 vezes sem juros',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Boleto Bancário',
          PaymentSystemGroupName: 'bankInvoicePaymentGroup',
          Name: 'Boleto Bancário à vista',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Hipercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Hipercard à vista',
        },
        {
          Value: 34.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 2,
          PaymentSystemName: 'Hipercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Hipercard 2 vezes sem juros',
        },
        {
          Value: 23.33,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 3,
          PaymentSystemName: 'Hipercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Hipercard 3 vezes sem juros',
        },
        {
          Value: 17.49,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 4,
          PaymentSystemName: 'Hipercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Hipercard 4 vezes sem juros',
        },
        {
          Value: 13.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 5,
          PaymentSystemName: 'Hipercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Hipercard 5 vezes sem juros',
        },
        {
          Value: 11.66,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 6,
          PaymentSystemName: 'Hipercard',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Hipercard 6 vezes sem juros',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Elo',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Elo à vista',
        },
        {
          Value: 34.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 2,
          PaymentSystemName: 'Elo',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Elo 2 vezes sem juros',
        },
        {
          Value: 23.33,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 3,
          PaymentSystemName: 'Elo',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Elo 3 vezes sem juros',
        },
        {
          Value: 17.49,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 4,
          PaymentSystemName: 'Elo',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Elo 4 vezes sem juros',
        },
        {
          Value: 13.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 5,
          PaymentSystemName: 'Elo',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Elo 5 vezes sem juros',
        },
        {
          Value: 11.66,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 6,
          PaymentSystemName: 'Elo',
          PaymentSystemGroupName: 'creditCardPaymentGroup',
          Name: 'Elo 6 vezes sem juros',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Vale',
          PaymentSystemGroupName: 'giftCardPaymentGroup',
          Name: 'Vale à vista',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Venda Direta Credito',
          PaymentSystemGroupName: 'creditDirectSalePaymentGroup',
          Name: 'Venda Direta Credito à vista',
        },
        {
          Value: 34.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 2,
          PaymentSystemName: 'Venda Direta Credito',
          PaymentSystemGroupName: 'creditDirectSalePaymentGroup',
          Name: 'Venda Direta Credito 2 vezes sem juros',
        },
        {
          Value: 23.33,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 3,
          PaymentSystemName: 'Venda Direta Credito',
          PaymentSystemGroupName: 'creditDirectSalePaymentGroup',
          Name: 'Venda Direta Credito 3 vezes sem juros',
        },
        {
          Value: 17.49,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 4,
          PaymentSystemName: 'Venda Direta Credito',
          PaymentSystemGroupName: 'creditDirectSalePaymentGroup',
          Name: 'Venda Direta Credito 4 vezes sem juros',
        },
        {
          Value: 13.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 5,
          PaymentSystemName: 'Venda Direta Credito',
          PaymentSystemGroupName: 'creditDirectSalePaymentGroup',
          Name: 'Venda Direta Credito 5 vezes sem juros',
        },
        {
          Value: 11.66,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 6,
          PaymentSystemName: 'Venda Direta Credito',
          PaymentSystemGroupName: 'creditDirectSalePaymentGroup',
          Name: 'Venda Direta Credito 6 vezes sem juros',
        },
        {
          Value: 69.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 1,
          PaymentSystemName: 'Cartão C&A',
          PaymentSystemGroupName: 'customPrivate_401PaymentGroup',
          Name: 'Cartão C&A à vista',
        },
        {
          Value: 34.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 2,
          PaymentSystemName: 'Cartão C&A',
          PaymentSystemGroupName: 'customPrivate_401PaymentGroup',
          Name: 'Cartão C&A 2 vezes sem juros',
        },
        {
          Value: 23.33,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 3,
          PaymentSystemName: 'Cartão C&A',
          PaymentSystemGroupName: 'customPrivate_401PaymentGroup',
          Name: 'Cartão C&A 3 vezes sem juros',
        },
        {
          Value: 17.49,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 4,
          PaymentSystemName: 'Cartão C&A',
          PaymentSystemGroupName: 'customPrivate_401PaymentGroup',
          Name: 'Cartão C&A 4 vezes sem juros',
        },
        {
          Value: 13.99,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 5,
          PaymentSystemName: 'Cartão C&A',
          PaymentSystemGroupName: 'customPrivate_401PaymentGroup',
          Name: 'Cartão C&A 5 vezes sem juros',
        },
        {
          Value: 11.66,
          InterestRate: 0,
          TotalValuePlusInterestRate: 69.99,
          NumberOfInstallments: 6,
          PaymentSystemName: 'Cartão C&A',
          PaymentSystemGroupName: 'customPrivate_401PaymentGroup',
          Name: 'Cartão C&A 6 vezes sem juros',
        },
      ],
      DiscountHighLight: [],
      GiftSkuIds: [],
      Teasers: [],
      BuyTogether: [],
      ItemMetadataAttachment: [],
      Price: 69.99,
      ListPrice: 69.99,
      PriceWithoutDiscount: 69.99,
      RewardValue: 0,
      PriceValidUntil: '2040-09-24T11:00:00Z',
      AvailableQuantity: 4,
      Tax: 0,
      DeliverySlaSamples: [{ DeliverySlaPerTypes: [], Region: null }],
      GetInfoErrorMessage: null,
      CacheVersionUsedToCallCheckout: '738ceac6b96b3f79ee3a4faf3c1d9070_',
      PaymentOptions: {
        installmentOptions: [
          {
            paymentSystem: '2',
            bin: null,
            paymentName: 'Visa',
            paymentGroupName: 'creditCardPaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
              {
                count: 2,
                hasInterestRate: false,
                interestRate: 0,
                value: 3499,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 2,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 3499,
                    total: 6999,
                  },
                ],
              },
              {
                count: 3,
                hasInterestRate: false,
                interestRate: 0,
                value: 2333,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 3,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 2333,
                    total: 6999,
                  },
                ],
              },
              {
                count: 4,
                hasInterestRate: false,
                interestRate: 0,
                value: 1749,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 4,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1749,
                    total: 6999,
                  },
                ],
              },
              {
                count: 5,
                hasInterestRate: false,
                interestRate: 0,
                value: 1399,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 5,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1399,
                    total: 6999,
                  },
                ],
              },
              {
                count: 6,
                hasInterestRate: false,
                interestRate: 0,
                value: 1166,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 6,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1166,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '4',
            bin: null,
            paymentName: 'Mastercard',
            paymentGroupName: 'creditCardPaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
              {
                count: 2,
                hasInterestRate: false,
                interestRate: 0,
                value: 3499,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 2,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 3499,
                    total: 6999,
                  },
                ],
              },
              {
                count: 3,
                hasInterestRate: false,
                interestRate: 0,
                value: 2333,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 3,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 2333,
                    total: 6999,
                  },
                ],
              },
              {
                count: 4,
                hasInterestRate: false,
                interestRate: 0,
                value: 1749,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 4,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1749,
                    total: 6999,
                  },
                ],
              },
              {
                count: 5,
                hasInterestRate: false,
                interestRate: 0,
                value: 1399,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 5,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1399,
                    total: 6999,
                  },
                ],
              },
              {
                count: 6,
                hasInterestRate: false,
                interestRate: 0,
                value: 1166,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 6,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1166,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '6',
            bin: null,
            paymentName: 'Boleto Bancário',
            paymentGroupName: 'bankInvoicePaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '8',
            bin: null,
            paymentName: 'Hipercard',
            paymentGroupName: 'creditCardPaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
              {
                count: 2,
                hasInterestRate: false,
                interestRate: 0,
                value: 3499,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 2,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 3499,
                    total: 6999,
                  },
                ],
              },
              {
                count: 3,
                hasInterestRate: false,
                interestRate: 0,
                value: 2333,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 3,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 2333,
                    total: 6999,
                  },
                ],
              },
              {
                count: 4,
                hasInterestRate: false,
                interestRate: 0,
                value: 1749,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 4,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1749,
                    total: 6999,
                  },
                ],
              },
              {
                count: 5,
                hasInterestRate: false,
                interestRate: 0,
                value: 1399,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 5,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1399,
                    total: 6999,
                  },
                ],
              },
              {
                count: 6,
                hasInterestRate: false,
                interestRate: 0,
                value: 1166,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 6,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1166,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '9',
            bin: null,
            paymentName: 'Elo',
            paymentGroupName: 'creditCardPaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
              {
                count: 2,
                hasInterestRate: false,
                interestRate: 0,
                value: 3499,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 2,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 3499,
                    total: 6999,
                  },
                ],
              },
              {
                count: 3,
                hasInterestRate: false,
                interestRate: 0,
                value: 2333,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 3,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 2333,
                    total: 6999,
                  },
                ],
              },
              {
                count: 4,
                hasInterestRate: false,
                interestRate: 0,
                value: 1749,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 4,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1749,
                    total: 6999,
                  },
                ],
              },
              {
                count: 5,
                hasInterestRate: false,
                interestRate: 0,
                value: 1399,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 5,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1399,
                    total: 6999,
                  },
                ],
              },
              {
                count: 6,
                hasInterestRate: false,
                interestRate: 0,
                value: 1166,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 6,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1166,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '16',
            bin: null,
            paymentName: 'Vale',
            paymentGroupName: 'giftCardPaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '45',
            bin: null,
            paymentName: 'Venda Direta Credito',
            paymentGroupName: 'creditDirectSalePaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
              {
                count: 2,
                hasInterestRate: false,
                interestRate: 0,
                value: 3499,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 2,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 3499,
                    total: 6999,
                  },
                ],
              },
              {
                count: 3,
                hasInterestRate: false,
                interestRate: 0,
                value: 2333,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 3,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 2333,
                    total: 6999,
                  },
                ],
              },
              {
                count: 4,
                hasInterestRate: false,
                interestRate: 0,
                value: 1749,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 4,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1749,
                    total: 6999,
                  },
                ],
              },
              {
                count: 5,
                hasInterestRate: false,
                interestRate: 0,
                value: 1399,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 5,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1399,
                    total: 6999,
                  },
                ],
              },
              {
                count: 6,
                hasInterestRate: false,
                interestRate: 0,
                value: 1166,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 6,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1166,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '401',
            bin: null,
            paymentName: 'Cartão C&A',
            paymentGroupName: 'customPrivate_401PaymentGroup',
            value: 6999,
            installments: [
              {
                count: 1,
                hasInterestRate: false,
                interestRate: 0,
                value: 6999,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 1,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 6999,
                    total: 6999,
                  },
                ],
              },
              {
                count: 2,
                hasInterestRate: false,
                interestRate: 0,
                value: 3499,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 2,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 3499,
                    total: 6999,
                  },
                ],
              },
              {
                count: 3,
                hasInterestRate: false,
                interestRate: 0,
                value: 2333,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 3,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 2333,
                    total: 6999,
                  },
                ],
              },
              {
                count: 4,
                hasInterestRate: false,
                interestRate: 0,
                value: 1749,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 4,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1749,
                    total: 6999,
                  },
                ],
              },
              {
                count: 5,
                hasInterestRate: false,
                interestRate: 0,
                value: 1399,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 5,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1399,
                    total: 6999,
                  },
                ],
              },
              {
                count: 6,
                hasInterestRate: false,
                interestRate: 0,
                value: 1166,
                total: 6999,
                sellerMerchantInstallments: [
                  {
                    id: 'CEA',
                    count: 6,
                    hasInterestRate: false,
                    interestRate: 0,
                    value: 1166,
                    total: 6999,
                  },
                ],
              },
            ],
          },
          {
            paymentSystem: '3',
            bin: null,
            paymentName: 'Diners',
            paymentGroupName: 'creditCardPaymentGroup',
            value: 6999,
            installments: [],
          },
        ],
        paymentSystems: [
          {
            id: 16,
            name: 'Vale',
            groupName: 'giftCardPaymentGroup',
            validator: null,
            stringId: '16',
            template: 'giftCardPaymentGroup-template',
            requiresDocument: false,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 6,
            name: 'Boleto Bancário',
            groupName: 'bankInvoicePaymentGroup',
            validator: null,
            stringId: '6',
            template: 'bankInvoicePaymentGroup-template',
            requiresDocument: false,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 2,
            name: 'Visa',
            groupName: 'creditCardPaymentGroup',
            validator: null,
            stringId: '2',
            template: 'creditCardPaymentGroup-template',
            requiresDocument: true,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 3,
            name: 'Diners',
            groupName: 'creditCardPaymentGroup',
            validator: null,
            stringId: '3',
            template: 'creditCardPaymentGroup-template',
            requiresDocument: true,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 4,
            name: 'Mastercard',
            groupName: 'creditCardPaymentGroup',
            validator: null,
            stringId: '4',
            template: 'creditCardPaymentGroup-template',
            requiresDocument: true,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 9,
            name: 'Elo',
            groupName: 'creditCardPaymentGroup',
            validator: null,
            stringId: '9',
            template: 'creditCardPaymentGroup-template',
            requiresDocument: true,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 45,
            name: 'Venda Direta Credito',
            groupName: 'creditDirectSalePaymentGroup',
            validator: null,
            stringId: '45',
            template: 'creditDirectSalePaymentGroup-template',
            requiresDocument: false,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 401,
            name: 'Cartão C&A',
            groupName: 'customPrivate_401PaymentGroup',
            validator: null,
            stringId: '401',
            template: 'customPrivate_401PaymentGroup-template',
            requiresDocument: true,
            isCustom: true,
            description: 'Pague usando o seu cartão C&A!',
            requiresAuthentication: false,
            dueDate: '2020-12-07T12:11:51.0676848Z',
            availablePayments: null,
          },
          {
            id: 8,
            name: 'Hipercard',
            groupName: 'creditCardPaymentGroup',
            validator: null,
            stringId: '8',
            template: 'creditCardPaymentGroup-template',
            requiresDocument: true,
            isCustom: false,
            description: null,
            requiresAuthentication: false,
            dueDate: '2020-12-04T12:11:51.0676848Z',
            availablePayments: null,
          },
        ],
        payments: [],
        giftCards: [],
        giftCardMessages: [],
        availableAccounts: [],
        availableTokens: [],
      },
    },
  }

  return newSeller
}

function convertFromBiggySkuToCatalogApiSellers(
  sku: BiggySearchSku
): CatalogApiSeller[] {
  const { sellers } = sku

  return sellers.map((seller) =>
    convertFromBiggySellerAndSkuToCatalogApiSeller(seller, sku)
  )
}

function convertFromBiggyProductImagesToCatalogApiImages(
  product: BiggySearchProduct
) {
  return product.images.map((img) => ({
    imageId: '', // TODO: Biggy still don't have this
    imageLabel: img.name,
    imageTag: '', // TODO: Biggy still don't have this
    imageUrl: img.value,
    imageText: img.name,
    imageLastModified: '', // TODO: Biggy still don't have this
  }))
}

function biggySkuBaseInfoToCatalog(
  sku: BiggySearchSku,
  product: BiggySearchProduct
) {
  return {
    itemId: sku.id,
    name: '', // TODO: Biggy still don't have this
    nameComplete: '', // TODO: Biggy still don't have this (product name + sku name)
    complementName: '', // TODO: Biggy still don't have this
    ean: '',
    referenceId: [{ Key: 'RefId', Value: sku.reference }],
    measurementUnit: product.measurementUnit,
    unitMultiplier: product.unitMultiplier,
    modalType: null,
    isKit: false,
    Videos: [], // Todo: Biggy still don't have this
    estimatedDateArrival: null, // TODO: Biggy still don't have this}
  }
}

function convertFromBiggySkuAndProductToCatalogApiItem(
  sku: BiggySearchSku,
  product: BiggySearchProduct
): CatalogApiSku {
  return {
    ...biggySkuBaseInfoToCatalog(sku, product),

    images: convertFromBiggyProductImagesToCatalogApiImages(product), // TODO: Biggy still don't have this (using from product for now)

    // Pegar dados em sku.attributes
    // Cor: ['Azul'],
    // Tamanho: ['1'],
    // variations: ['Cor', 'Tamanho'],

    sellers: convertFromBiggySkuToCatalogApiSellers(sku),
  }
}

function convertFromBiggyProductToCatalogApiItems(
  product: BiggySearchProduct
): CatalogApiSku[] {
  const { skus } = product

  return skus.map((sku: BiggySearchSku) =>
    convertFromBiggySkuAndProductToCatalogApiItem(sku, product)
  )
}

export function convertFromBiggyProductToCatalogApiProduct(
  product: BiggySearchProduct
): CatalogApiProduct {
  return {
    ...biggyProductBaseInfoToCatalog(product),
    items: convertFromBiggyProductToCatalogApiItems(product),
  }
}

export function convertFromBiggyProductsToCatalogApiProducts(
  products: BiggySearchProduct[]
): CatalogApiProduct[] {
  if (!products || !Array.isArray(products) || products.length === 0) {
    return []
  }

  return products.map((product: BiggySearchProduct) =>
    convertFromBiggyProductToCatalogApiProduct(product)
  )
}

export { BiggySearchProduct, BiggySearchResult, CatalogApiProduct }

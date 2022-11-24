import React from 'react';

interface Props {
  color?: string;
  width?: number;
  height?: number;
  iconOnly?: boolean;
}

export const Logo: React.FC<Props> = (props: Props) => {
  const fill = props.color ?? 'black';
  const height = props.height ?? 70;
  let width = props.width ?? height * 380 / 70;
  if (props.iconOnly) {
    width = height * 207 / 238;
    return (
      <svg width={width} height={height} viewBox="0 0 207 238" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M92.2633 1.19882C94.409 2.64452 96.1473 5.72774 96.1577 8.10684C96.171 11.1822 94.5495 13.6589 91.1636 15.7367C62.3774 33.4007 41.4672 54.4921 28.4759 78.967C6.2628 120.815 12.4675 165.118 45.0854 197.558C55.2974 207.715 65.0932 213.935 77.2841 218.005C103.085 226.616 130.544 220.924 155.096 201.873C161.709 196.741 165.309 193.116 165.118 191.784C164.843 189.879 162.507 189.622 156.671 190.853C147.89 192.704 142.551 193.376 134.103 193.692C121.122 194.179 113.357 192.841 104.609 188.61C100.819 186.778 99.2511 185.647 95.9303 182.348C91.4028 177.851 88.9839 173.932 87.2061 168.214C86.2001 164.979 86.0611 163.558 86.0936 156.873C86.1237 150.692 86.3308 148.505 87.1766 145.435C90.8628 132.049 98.7664 119.885 108.581 112.49C124.699 100.347 146.43 98.6995 165.452 108.179C175.557 113.215 184.312 121.612 188.806 130.578C192.443 137.835 193.641 146.512 191.938 153.246C189.027 164.757 184.114 169.11 177.947 165.644C173.701 163.258 172.77 158.935 175.315 153.422C176.614 150.608 176.794 149.672 176.794 145.752C176.794 141.567 176.675 141.048 174.898 137.452C172.527 132.656 167.499 127.53 161.945 124.245C148.706 116.415 133.731 116.101 120.998 123.385C108.93 130.289 99.081 149.914 101.589 162.063C103.183 169.784 108.13 174.254 117.617 176.546C125.594 178.474 135.386 178.305 147.945 176.025C151.065 175.459 155.059 174.744 156.822 174.437C166.379 172.771 174.955 176.509 178.686 183.965C180.723 188.036 181.248 191.227 180.525 195.144C179.357 201.487 176.127 205.62 165.925 213.83C153.792 223.593 138.982 231.282 125.261 234.941C107.542 239.667 88.6269 238.901 71.1731 232.75C34.8991 219.966 4.89334 180.945 0.50389 140.848C-0.256044 133.904 -0.140648 121.064 0.743561 114.157C2.78518 98.2128 8.84786 80.9674 17.8694 65.4414C31.7321 41.5838 55.6505 18.0285 81.5927 2.68446C86.7742 -0.380017 89.3814 -0.742922 92.2633 1.19882ZM168.904 9.15315C174.673 11.7167 175.265 20.2139 169.889 23.3065C169.076 23.7739 164.86 24.975 160.521 25.9755C119.131 35.5175 88.0869 55.3333 66.8556 85.7636C63.5585 90.4892 61.2264 92.0592 58.1221 91.6426C53.6537 91.0435 50.4316 86.9845 50.9282 82.5803C51.2196 79.9926 53.6626 76.2334 61.1155 66.9019C83.8898 38.3882 116.732 19.1508 158.737 9.71773C165.045 8.30111 166.772 8.20546 168.904 9.15315ZM174.082 54.8126C182.297 55.4226 188.919 56.9615 196.538 60.0314C204.308 63.1619 206.667 65.3472 206.978 69.7016C207.304 74.2749 204.037 77.9809 199.678 77.9809C198.622 77.9809 196.168 77.1747 193.689 76.0125C175.767 67.6149 152.587 69.137 127.919 80.3309C111.353 87.8483 96.2528 99.3898 89.7049 109.538C86.0112 115.262 85.9639 115.314 83.6747 116.188C81.8718 116.877 81.1681 116.917 79.379 116.435C75.1932 115.309 72.4563 110.872 73.3952 106.736C74.2833 102.825 79.7518 95.1947 86.0157 89.1289C102.348 73.3114 126.771 60.7266 149.736 56.2958C154.083 55.4566 167.236 54.1514 168.904 54.3935C169.175 54.4325 171.505 54.6213 174.082 54.8126Z" fill={fill}/>
      </svg>

    );
  }

  
  
  return (
    <svg width={width} height={height} viewBox="0 0 1048 238" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M92.2633 1.19882C94.409 2.64452 96.1473 5.72774 96.1577 8.10684C96.171 11.1822 94.5495 13.6589 91.1636 15.7367C62.3774 33.4007 41.4672 54.4921 28.4759 78.967C6.2628 120.815 12.4675 165.118 45.0854 197.558C55.2974 207.715 65.0931 213.935 77.2841 218.005C103.085 226.616 130.544 220.924 155.096 201.873C161.709 196.741 165.309 193.116 165.118 191.784C164.843 189.879 162.507 189.622 156.671 190.853C147.89 192.704 142.551 193.376 134.103 193.692C121.122 194.179 113.357 192.841 104.609 188.61C100.819 186.778 99.2511 185.647 95.9303 182.348C91.4028 177.851 88.9839 173.932 87.2061 168.214C86.2001 164.979 86.061 163.558 86.0936 156.873C86.1237 150.692 86.3308 148.505 87.1766 145.435C90.8628 132.049 98.7664 119.885 108.581 112.49C124.699 100.347 146.43 98.6995 165.452 108.179C175.557 113.215 184.312 121.612 188.806 130.578C192.443 137.835 193.641 146.512 191.938 153.246C189.027 164.757 184.114 169.11 177.947 165.644C173.701 163.258 172.77 158.935 175.315 153.422C176.614 150.608 176.794 149.672 176.794 145.752C176.794 141.567 176.675 141.048 174.898 137.452C172.527 132.656 167.499 127.53 161.945 124.245C148.706 116.415 133.731 116.101 120.998 123.385C108.93 130.289 99.081 149.914 101.589 162.063C103.183 169.784 108.13 174.254 117.617 176.546C125.594 178.474 135.386 178.305 147.945 176.025C151.065 175.459 155.059 174.744 156.822 174.437C166.379 172.771 174.955 176.509 178.686 183.965C180.723 188.036 181.248 191.227 180.525 195.144C179.357 201.487 176.127 205.62 165.925 213.83C153.792 223.593 138.982 231.282 125.261 234.941C107.542 239.667 88.6269 238.901 71.1731 232.75C34.8991 219.966 4.89334 180.945 0.50389 140.848C-0.256044 133.904 -0.140648 121.064 0.743561 114.157C2.78518 98.2128 8.84787 80.9674 17.8694 65.4414C31.7321 41.5838 55.6505 18.0285 81.5927 2.68446C86.7742 -0.380017 89.3814 -0.742922 92.2633 1.19882ZM168.904 9.15315C174.673 11.7167 175.265 20.2139 169.889 23.3065C169.076 23.7739 164.86 24.975 160.521 25.9755C119.131 35.5175 88.0869 55.3333 66.8556 85.7636C63.5585 90.4892 61.2264 92.0592 58.1221 91.6426C53.6537 91.0435 50.4316 86.9845 50.9282 82.5803C51.2196 79.9926 53.6626 76.2334 61.1155 66.9019C83.8898 38.3882 116.732 19.1508 158.737 9.71773C165.045 8.30111 166.772 8.20546 168.904 9.15315ZM174.082 54.8126C182.297 55.4226 188.919 56.9615 196.538 60.0314C204.308 63.1619 206.667 65.3472 206.978 69.7016C207.304 74.2749 204.037 77.9809 199.678 77.9809C198.622 77.9809 196.168 77.1747 193.689 76.0125C175.767 67.6149 152.587 69.137 127.919 80.3309C111.353 87.8483 96.2528 99.3898 89.7049 109.538C86.0112 115.262 85.9639 115.314 83.6747 116.188C81.8718 116.877 81.1681 116.917 79.379 116.436C75.1932 115.309 72.4562 110.872 73.3952 106.736C74.2833 102.825 79.7518 95.1947 86.0157 89.1289C102.348 73.3114 126.771 60.7266 149.736 56.2958C154.083 55.4566 167.236 54.1514 168.904 54.3935C169.175 54.4325 171.505 54.6213 174.082 54.8126Z" fill={fill}/>
      <path d="M311.48 73.8515H339.971V92.1669H311.48V182H288.804V92.1669H275.14V73.8515H288.804V65.4205C288.804 54.3731 292.196 45.4576 298.979 38.6741C305.763 31.6968 314.097 28.2081 323.981 28.2081C333.866 28.2081 342.685 31.7937 350.437 38.9649L341.134 54.9545C336.482 50.303 331.831 47.9772 327.179 47.9772C322.334 47.9772 318.458 49.5277 315.551 52.6288C312.837 55.536 311.48 59.6061 311.48 64.8391V73.8515Z" fill={fill}/>
      <path d="M384.734 135.484V182H362.057V73.8515H384.734V95.3649C388.416 88.5814 393.358 83.0576 399.561 78.7937C405.956 74.5298 412.643 72.3009 419.62 72.1071L419.911 95.0741H418.748C407.701 95.0741 399.27 98.6597 393.455 105.831C387.641 113.002 384.734 122.886 384.734 135.484Z" fill={fill}/>
      <path d="M465.423 182H442.747V73.8515H465.423V182ZM439.84 41.8721C439.84 37.9958 441.196 34.7009 443.91 31.9875C446.817 29.0803 450.306 27.6267 454.376 27.6267C458.252 27.6267 461.547 29.0803 464.26 31.9875C467.168 34.7009 468.621 37.9958 468.621 41.8721C468.621 45.9422 467.168 49.4308 464.26 52.3381C461.547 55.0515 458.252 56.4082 454.376 56.4082C450.306 56.4082 446.914 54.9545 444.201 52.0473C441.293 49.3339 439.84 45.9422 439.84 41.8721Z" fill={fill}/>
      <path d="M599.241 137.81H514.35C514.932 145.563 518.517 151.862 525.107 156.707C531.697 161.552 539.352 163.975 548.074 163.975C561.835 163.975 572.107 159.711 578.89 151.183L591.973 165.429C580.344 177.639 565.13 183.744 546.33 183.744C530.824 183.744 517.839 178.608 507.373 168.336C496.907 158.064 491.674 144.497 491.674 127.635C491.674 111.161 497.004 97.7875 507.664 87.5154C518.323 77.2432 531.212 72.1071 546.33 72.1071C561.447 72.1071 574.045 76.6618 584.123 85.771C594.202 94.8803 599.241 106.994 599.241 122.111V137.81ZM576.565 119.785C576.565 111.064 573.754 104.183 568.134 99.1442C562.707 94.1051 555.633 91.5855 546.911 91.5855C538.189 91.5855 530.534 94.202 523.944 99.435C517.548 104.668 514.35 111.451 514.35 119.785H576.565Z" fill={fill}/>
      <path d="M647.181 182H624.505V73.8515H647.181V93.3298C650.863 86.7401 655.903 81.604 662.299 77.9216C668.888 74.0453 675.866 72.1071 683.23 72.1071C695.828 72.1071 705.81 75.8865 713.175 83.4453C720.54 91.004 724.222 101.761 724.222 115.715V182H701.255V122.693C701.255 102.73 693.018 92.7484 676.544 92.7484C668.21 92.7484 661.233 95.4618 655.612 100.889C649.991 106.122 647.181 113.583 647.181 123.274V182Z" fill={fill}/>
      <path d="M748.889 127.344C748.889 111.064 754.025 97.7875 764.297 87.5154C774.569 77.2432 787.167 72.1071 802.091 72.1071C816.433 72.1071 827.965 78.2123 836.687 90.4226V31.1154H859.654V182H836.687V165.719C828.546 177.736 816.336 183.744 800.056 183.744C785.907 183.744 773.794 178.511 763.716 168.045C753.831 157.385 748.889 143.818 748.889 127.344ZM804.998 163.394C814.107 163.394 821.763 160.099 827.965 153.509C834.167 146.919 837.268 138.489 837.268 128.216C837.268 118.138 834.07 109.61 827.674 102.633C821.472 95.6556 813.817 92.1669 804.707 92.1669C795.598 92.1669 787.749 95.6556 781.159 102.633C774.763 109.416 771.565 117.944 771.565 128.216C771.565 138.489 774.86 146.919 781.45 153.509C788.039 160.099 795.889 163.394 804.998 163.394Z" fill={fill}/>
      <path d="M915.136 182H892.46V31.1154H915.136V182Z" fill={fill}/>
      <path d="M934.991 214.27L945.457 195.955C950.302 200.412 955.245 202.641 960.284 202.641C965.129 202.641 969.199 200.8 972.494 197.117C975.789 193.629 977.436 189.656 977.436 185.198C977.436 183.454 962.803 146.338 933.537 73.8515H957.958L990.519 153.509L1022.79 73.8515H1047.21L994.589 202.35C991.488 209.328 987.03 214.851 981.216 218.922C975.401 222.992 969.005 225.027 962.028 225.027C951.95 225.027 942.937 221.441 934.991 214.27Z" fill={fill}/>
    </svg>

  );
};
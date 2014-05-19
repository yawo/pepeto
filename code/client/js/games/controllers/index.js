/*
 * client/js/main/controllers/home.js
 */

'use strict';

exports = module.exports = function (ngModule) {
  ngModule
    .controller('DiscussionsCtrl', function ($scope,$rootScope, $stateParams,play) {
      var elementDiscussion =  document.querySelector("#discussions .dtable");
      $scope.message = null;
      $scope.discussions = [
            {author:'Toto', message:'test message'},
            {author:'Marcel', message:'How u doing dudes'},
            {author:'John', message:'Quick bro, aint have all the day'}
      ];
      $scope.sendMessage = function(){
        $scope.discussions.push({author:$scope.players[$scope.me].name, message:$scope.message});
        $scope.message=null;
        elementDiscussion.scrollTop = elementDiscussion.scrollHeight-10;
      };
    })
    .controller('GameHeaderCtrl', function ($scope, $rootScope, $stateParams, play) {
      var elementPlayCountdown = document.querySelector("#play-countdown");
      $rootScope.me = 0;
      $rootScope.play = play;
      $rootScope.players = [{ 
        name:'John',
        points:5200,
        style:'Aggressive',
        status:'I\'ll kill you!',
        totalGames: 3,
        avatarUrl:'data:image/gif;base64,R0lGODlhWgBaANUAAFFnfIut0G+Nqlx0jDlFT2aAmklcb7nm/sr3/yUnKBYYGYWNjanU+mp1e5nB6UVTX9L9/zQ4OTE8RkJHSnJ8fykzPAgJCpK33WBsdVBaXyYsMEBNWLHd/l1nbB0jKXmXtqPO9rrM2KHH7IGixJSensDt//b+/xocHQwOEaW1tsva5xETFMnY1q6/x5u+3nqChKfQ69jt+lZgZSAhIk5UVjtAQi4wMHF2dEdNUWdvcwgKDAgKCgcICggICgsMDwoLDiH5BAAAAAAALAAAAABaAFoAAAb/wIRiSCwahydFcqlsMp/Ok3RKrVqv2NNspuVut6ueeEwu887otHpNtuje8Lj8/avb7z+ffq9H+f+AfgprhIWGamVzinJ4jXyPgZEKPYeVlmVui4uNjo97kYGDlqOFZoaZjJx3np+gf5OksWhkZxYrJx4VEhIaHis6Z3GqeKx9roKysmJoChIZMh0dGAPUBdQPKzyZw3bFxsewyZXLPD0aDwANAxgA0dLVBQIFBGjcdd4+x8jih5Q8OgkyYGA3cAAADDJkGAAAYICADw8BnOCxwx4+fShE8WNDyYIGGtESymDIjuGzkQ0FjFj5gd4ZFD44XdSnceMsSito5MjRQaRI/wMyHmzYgMMAPAEBAowIUECCBR75Yq7yhnESLX7LUMi40YBnTxk0cEyoISFChAoENiykpnKlAwYcAnSoAKxHt5ngyuglRUkrBQo7ecrIMGECgRo1Iuwi8MDA2odLRbw9wMGBAAln7uF1ZVXvVURmfGR48fdGDpEZwuI4vEsCY8cD4qkM4OACCA4HGOgeUSHzZlCdPQvfayEDBdI3OnhNmBrH6sWvAcj+sNL2bcq6S3Aw8O+3pOHgzdSg0MB0DtPRBGd48Bz6QukCZlvngFv7gdwAeOQpVjW8fx4JNIDBeS/cYN5yGaxGAAGuudZYSh9Q54ADt9VXAnYOaAAVfzT5B/+eNjL89cKIFHDF004JPWDYgoupBSF1F1CI2wEIlGAjAyAMoB+HeXkoHA8R3LDAAi8QSR5gDQDGHA4brOiaWgvF80EAMYpgIQL3ccBAAB5s6El/Pu7FgwxDFjkiaSWSd9ozQhG1YFoPSvfBBXRORpmNGGLGI2dhfhbBkGUS+UIDhO7kzmAPZLDeUBvEGdtSEzJgXwlYUgYCd3sC1+cyM9gQQZGBGpnkoIEJmFBPirL3ADoNPTohbrhBAEGNHIAgAAo6ZBrICRZsysMEMuQAqJnHHfkXBoSSh0EHDQyW2lAPsgXjWxciYC1lHIyggAW6AnLCDhb06iMPOGQg7LB/kZf/JAUDrtsssggh2qhjKc1GIY02aqflBV12+8e3OwQMrrg/jrnVsGgaKyChC+cw0LJBJdiYUQ7BaBu+B9i4r4b++gGwwAKH6xlUGXRwg5kJ/0VouwJKsyy8g9EA7VpSUukCA/dRqt2WvXWMwscgh7yXAjotQIHRZ5K48oAO50BosCt38AAN0cUGGZUi3IZnrSP02zHQQQdM8DJEm3ZDBjZoYBYB5cqwrDsDOayc06gyOa+0K9FWYZaWec3KMWCHPfAYAJp8XgQKeJoAF7fM4IEGGkhQQ6PQdLWTgKq+J2WEI1wgKX2UWTaRdx4LbnqvPMxgcgcUaLBCgs5NoAEONdiQ/0ACJ6ywQkYKPF7BBFOLpVYG8OVNJQj65nZBAbiS/rPppp9hg7kZLFADgGI5Z0NYhRWGWAS2z6DACj7o8IPuSniQC1oEGKWSCzDcBsIIAzRPFSiBQx8wD9vTUP0NXZpdYSIglrHUYIDgA9/txIe+WwwBfeObwQp614sKWPAEucJHPiKRP/0BiTAyKFIGBkHACZSwe98ziw3Clzvy8W4KCfDUBGBXQAqkoEuaud+u9Cc4IHWABicj0gR+UQMcRACF30sM+CDHuJjo4RZJiOERaUBFGUygAy0wAT1y2K0OQo8HJ9DJcYrUgAqgYAUGRKJZVMhC8nHLBxOUQgLUhgP/0f9ABhHAogq2yMW/7TAOPNwBD25BgzGOaC4+OMFYvJdC8KVtcRL0QcB058A5RoCK/pOBDXIQghYAoHx9/NIOfwCHQA5SCzk4Gok6oAEUzCCNKVzhCheXux34wAJnfOAEI1CyH9KgBjdgAQkA8Iu76AqDP9jBG3iIyxMIIQLHMRIFWOlKxFhTiSvUACTJZ8sJ5iMXBhjBAlD1jAUIEwC4MmamvkXKZXrwdis8QQhJ9BcZmHEGScTmLHGngD3Y8gQScEgAcFOAO5rLnNNIZygh4S3zKVMHPOSBB2zgzBgWizQCykAFdBcBJbLRdovrpxgSt6AHFGAEkoIBBp6RAxKwoAH/BSimOv3osWS2E6JfVIACNTADHIhoRA3oiQTG56k1ynKbPdhBAtLypnDGQFYi6EAGGuDSDYzgBHaZig6R+VB39lABFYjAFrQQohEZSaoEOIErPZXNBX5rBRVo1GpmiIERxMAEJkDABTBAARK0gAAOwKFW73cCm86hhyuAnAcqqroG0PM0QXHdBGdwO1omcgOpWZUMHBsiFxzgrgcQwAJSQAECgKA3MrkIV5Mph6ABI7GQY+wm1SSglT6DABrI3Rkl+QMPJGo9IQrqBto3JRGUwAQBGG0NAHBa/aSWP+ysiCIE9gaoQM4GHugU7ibgtK4wbCiD2UBryCIBoDyDr9Nc/09aBlBcygzgARUYAQj42AlvrLarcAiXMuuQ2ApooAJbuF0YL6cuGexiqssCrkiQpazwLggAKokRBz4AYQo9wLnPZUVhKyLdUv7gjFBUAuQ0YAMuCFgDc4uaDAhQgQc41lRBwYCZEiyUBRmgANShUudAQKENYDjDj+CVTTkMBx8oYI4BxoV//+tMniqAu5dDiFQ3oIsQKisaMH0BQlY1XLU4ZCkBoI58L/VjIO9hBkO+KUQ3KAUFUPZx2ozAYnmqBXfs5GFBqYAHNuDYlyXJVBkYro0fpZT4BOAAOSqzmX1gg0k4lLXc2oIuZ8CLET+uC0mogDuw7LA8926qyTpWUP+G6yCrrSQ+OANBfszHDVYkwBd26bAFEhdDG+wOoJBbckipAJJo8LVQUsMsWpJVAHYtikESQMeX43MbBjjAx/aYqRA09GgL/MCZigOxnuGs2CNL2gab5mvCSIABCVQAWX8OCot2sYGGyEYAngNBAHqj6GHsIQEoSGsP9GuLLXiqn7t7tQJGPEc37xoHhxpIsnCbC2bVNtDrloCLHCKABwTUVoOINjF8MAMf4CABPADxCihL2QgkYIOOW8Ece6EBN3ugCeBmjq+b5brHOXxZNW5NXDU3APVJQAD1I6XGV4FvCexuDyeIZwxPDhNc3EKxLZc0ElDzDAMsAAODaPjKwML/Il1InGboRIEHAPAAOAz9DhJspQ8owfHwJcDkG/zEwAvuZiYg3FlAufogAAqvDhiA1AzSRbQKcOHeGoDadDj7DyQ4EYrkIan+ThtMAvHNl9edCDNwVmoMgIEHZJ0AcVupoFuTbKNIRwI6QEF5cZUKjSfhB1Dxww/YTlnbcVNkaXhgmyeIAoSvhz0d2IAHfpCADSBkIBlYtwVL3yq6KEC8/5jD0E+uuz/sgBI96FQ84z7B6uMyjg90paJk9gAZCB8FcV2WcEdvbokzpAAAaOXYu6SIofPq9RsUJA8SJ0uQklx82KcDlERJRPN7ICEDvjA9bhNUb0IWFpQWa2EA41Ne/9FXf9E2Az1QfTAhSYK0AraTTV7ABUmAfT1gZAPogamyAR2wABrgAxUADdEQaKRmbrpALwOwAT8jfBVogdwwET3gB3qwA0MAFV8ggrunBWGAE1IgcgpQLuRHAhLAaNAAFKuCbDQYHQAgAehHD5ogDMPAK7awgSiAOyNXhEUIQ2qVVAPoB7qjgEzSAQTQDG6TWU6yfO3DEPGnAGmFBqiwCarQcQIIEypHUVrgfyI4Pjswco0GLigAMhv0ZOZHAOvxdiVzbIFnQWixEAuhPn+3IB5wS13Iao0wAyjwYeSTdB5YRyUGRxPUBEggadenBvmQWDKwGkKRAM5gfhMwXDVgQf//lYmOsQFgRQDSYRAu0YfS1whCkAe3JkFARAE04AVv9z20pARJsHZqwIwTQAMSYBgaMEMGQAB1uGQ75xjbtoUKAQBphQI76Id1sDjd9DONBhIFMgFFlRglxjgglgT6lwbJ9BGLMTtCUQML4oC59iRqMXA6YAGvIRQNoSdqxoO2w19LV4BCQgOVJWBasDhhMIsjqAa4hBiu8TvJtwtj4Yu51mUP0AtnkABgpxAvBxOh+Aa2gwI9MHCyREUGYkRN9kjaJAT7lg91twJPcQaUQGleFwGBp3OKpQsM0j4bAAxgtAEygGPwNwAEsFisF4qSJ4ThQ0A6cQM0IFbap0LahGb/P/iKC2STaKBy/xU5Z4GJipULu+CUGnIGe2YA1PEB6rAAvLACEakIJocTtVdEOEAmeFRZR0Q7jhQGcfQFtdZET2GCuOABKzeX64OJg/ALHpABAxADIeACIfABLrABLReYc7CTSfc9NjABhymWJidFziEW4IOBjVNZkFNZX5AEu/MD3HJGuVSZTskgXTIEM2BSKqACd9UCH9Bz5DOTC0AC42QWY+EpdySWtUNii9k9EdBKP7NysvSTYzU+lIQraFCKGRE50LKHYLUYNzYCLTACBQB/2TCT0jkkGJkA+HhJBqJCHdU9NDAWEVBYR0ZiJLZPXKBLGzh75TB5J4AW67k7/wRgNbHxAtSAELGhI+04B9JpJo22dAlwRTewPQUkFvgYUjBRawcqnrvXm6V4BrszQR4gcevpAQRAHdbQAPIAGfFhAAIAbV14nwViA3BEWTGEAyN6QAqUoK2oPhxloG41BeS5AhWBjTAhYhC6Ko0xJS6gFB9QAISBWeyFARvwAeAiikJnB2WSHLXTb6v5QzUgPunDbSgpBdmpTUkwpboTE2LTTenDPowRG/GQN/AjAl36AQugEjAAAZjRTpxAJAYCFjjgOlFUAzTwAlbkmkgkOYnBCzi5QglKnkAYMDlEBOqjAWqBFBMCAwwAA4YKPzCQMQggK7IyApmhCpD6QwlBA/+u42YElAPNQRZjIY6So2e8eUYtWn2SFC4WIDAwegLqCWEj4AD1YS20eq20GqsIwAEcwwf74QMjcjZfgQNy6mZ3lD2LxAsvN4Djo0vleYLkqT4zig5SshQXYCWgQynWOqvXegEfYCMFQBF98AgLcAMiIVWNRgU40ACMiV0t1IpzKq/qU5m+s3NsMQJAVw1XQxtZAxfVWiOzyq8QcAEyYCWBtQOUpwcvcCgdMAFL8AXjkQHZKbG5hon+hZI365TthmMX4wJCERtiZjNvka/6aq3XKgIP8AFwAQC2oKe6M03KIVW5ZaSVhRAmKjmH8SYMQhaKoRhetxj0GmHIcwAFgAP/0hoALnABLuAAIgAXOVO0IZut6GAb2jKLIHZGXREvA1p7t8NTE9AVUqUabJM9C2JAkoO1jPF+08IANRIANOCj9sq2Hpsx+jorsxKy1gID6ghvDsAda7g7UCsDcUpZJCYEtlMBI8ITqSEzzsE2WVuQbzJxg9o5VkIpUYUDPEshk5szRnu5mHspxLgUAnCClFQoNFBilZU2J2ByGnAcQSWpi8Q2hmEYBFlSFFOvnUMtEAAD0DgAtKsbM2Ij1iKylnu5IKBNEzoCH+AL5NmuLwCs4XNdK6RTkNMARIIqKjK9DRi7rGI1Yva9JQABB/ABNAAAxbU3lFu01xqyJQACmJFsuQ+xUe2KPgJSAzxVWdjWKb2AAUTSLM3BSK+7i4P3EEFLJZIyKxfwDCfFtvQxI+Pbu5hbAgzgYxbkEEZXBBPUAMe7ODaQEbnTaIpFJqSxJoSrtXDCEFYDGUFrGwEMARzwAp45Jwgsq5UrK9aiMSDgY4+zAYRHBHmqADlQnRasfUvXUZoGKGoiVamhKOvxDA0BU/HBOWCGNZ8FASWQAjmAYy6QNfkqqzWCrVjCASJATJBDAAIAALhZWUEAADs='
      },
      {
        name:'William',
        points:12200,
        style:'Super Aggressive',
        status:'Uh I need some blood... oops points',
        totalGames: 25,
        avatarUrl:'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABaAFoDASIAAhEBAxEB/8QAGwAAAwEBAQEBAAAAAAAAAAAABAUGBwMCAQD/xAA2EAACAQMDAgQEBAYBBQAAAAABAgMABBEFEiEGMSJBUWETFIGRBzJxoRUjUrHR8BYXYoLB4f/EABgBAAMBAQAAAAAAAAAAAAAAAAMEBQIB/8QALREAAgIBBAADBwQDAAAAAAAAAQIAAxEEEiExE0FxBSJRgZGx8CMyYaHR4fH/2gAMAwEAAhEDEQA/AJI6aNf6kvibNoFgchV3MTuZsjcT6gN9sVZ2nTVraWjW55dOxJ/31NKNKee0OsavHGdsWoOjozEjYoULz6+I0x07qOLV2+KjBJScMCcbf/la0wbGR5Sf7UtC4BGQYTpUQgvXD8fCXke9AahdXFsbi4dVwSTye5zxTKaOQXeWiPxHwpOOCKA6hspp7iPTrfmRyg49f9NUqrd7n0kA1MABjjP3ibpyxk1S++JKh+HGd7uR2HnV7K8s8wYjZGBtRPQeVcrO1t9Ltl06HDCPmWT+t/8AFfJ9YtdFtH1W6ZXxlbaIn8zev6CtF93P0mnG9vDX5/L8+Zhk8FppyCe/bJAysGMlj5ZrNdf1GW+uZmI2xsclR51y1Hqqa/leabHiPYc1zs7yDUx8IsoYevcUUe6O8mNUU8jIwB+Zgun6PFqOQ0O9gDsyeAaOine1jitozwpCECmnTEUJ1jF2HAT8oXGMjsTQWp2clpPLdFCkSStgnyABP9qDU+0NKup0+81jsZ5n2C3F4JJs5BOef6qIAcKAQmfPJNB6B1Fa6hqQtXiYTMCVZgAJPt2P96Pm6s0u3nkhdoVeNijDPYg4oNXh7ckwuosvNhWteo60WO3mOuacyPJAbxpNjnBKuiEcj9DQTdFPbXZl0yffnvFJgMB548mo3RG39Y3iBtvxrKKUblwCykqQPowo+51K3EjRTECUHhTwQfakdESGyDF/azhVGRkRjpUga3WC7XbPCAMOOfalDXiHW57ndhk3BD7420HfajLP8MOSXBwJgfFj0PrXKDT7p0aYxSFd27fjNUa61Us/xkW3Vl61Uc45/wC+k861q720CRxnxzMEB9M+dZ/1hrs19q62qsTFbqI0XPHuatr7TJ7u8hJHhiVpCT5YH+azP4azdQgXTD4bSgOT9645OR+dxn2YiCveeT/idre2uJojIACmOXJwg+tcpIbuxlS4XjDAhkO5T+hrQY+mIepdB+Qt7/4JjblAeMDkHHn5/euh0vT7NdO6Utp1urn4itdTKciNBycnyPtSyXWO20x/xFU5EZdOwxjSo9Uvh/PlUhYiO/oT7edfup2E3S85hQtMjfE2+TKO4+oBplfGObU0jgwsKKEVfbFdorRpJJ4pELI6beV7ZrdgKA59ZU0rLcm7PfEx221Ww0eUX8NvcfMoCY43ACqxGM7vPvUjJK8sryOxLOxYn3NV3VOl/wAME0LjBVsL+majqFaoXAEFU5bOTNl6u1H5eyWZJQLhrZlUD83EgJOf97VCWnU2rXMiw3CtqCryBJkuo9m7j61V9aRP/AILhI1bZKVLHucjAA/ekOk2Uf8Ax5JQrRzGYh2x+ZGUFTn0pSvhZrUcAmWXT1388xjZZAUA3RyY3ICcZ47jPGfvWjQTD+HpbLCQSu0Me2KxnQtPHTmvRaxc3kaW8mUYM4G9W4OB3Pr9BWtfObYghI3JxmnKmNmFMh6ipKM3V8Z4MCvYlt7bU3PiMds3b3rG2tbdy9y6s8pYkx449ua16/1WGCO/huBxPblQcHOcHH96yVL1UYqQASe1UVXvdBaY/pjw/wCfuZw+b1SRPgR3otoO2yIFMj3Pc/U1R9MatYdOxNvjzI3JlPJJpz0p09FrdpLcuUXHhGfWlutdNYkaONlUISp5711QgJGeZ21wQFcbVPnGsfVtvNdpMo3DcCxDA4FVdv1La3bxohXB7ZJzn0rGm0i6tJCUZvTtTHTby6s58sDyCDu96xbSlo65jWjevTHCnKmNvxVtWaOK62gbo+ceeKybH6VqvVN+uqdKQRbgZY9ynPfsT/6rK8H+mp7owUBvLIlYlCxNfRwfqJqetq8+iXqAZkjAdOcbcMCT9s0v0qyNz0UlzbXT21zayyRySpIVDqDkZp7c2XzYeNtwSRSrbe+CKn+kYZL/AEPXNIiyko2ukZbzxg/uKWQ4OZqwF1K/GI7TSbrUJZbmeZpzGu4szE/ua0zp/U21XRLeTfmWP+TJ6kgcftz9aUdL3kWj6BdR3UGHKsrqV5B7VP6Vq15pUt3HaRLIk5DjJ/Iwp9eTlR1JFwFtb1sf9EdS91UoqCSRlAAwS3lWY6havdXknyDCREPiI/WvGq6xqmoXPwLp3Ck4wg4qq0ezS1skVI8AgE+9PowuG3yERrqbRJuY5J+kE6f1/UdHsTEhKAnxAjuaNbX967pw25uSw5zXy8jjKkbef0pNLHhtpIx5Vo0gTuVv5aMl1OGSTaI3Kng84B+lC6jeJjESFT+wobww4we9cLyQQxMznLHtXCgUZhEqXcMQqzLXFncu+dqAD/yPb9t1SMlmxkY7T3NV2nI0OmyFj45PER744+1I33b258/SgWV5Ubo7TZ7xC+U2CzEcmzgHDCorpG7S3/EC9UKXjnjk2OOM+POf07/eqbTrpFUbgSPY4qK0a5Nv+IbysUwyyAoMYIOTtH++VRxKkZ9Y36afq88TlhHcyEMx52+CM/bxUv0ONP4msUhykgIU+R4rj+IV0l3dB1bBEnK5yeY05+pWpvTNUkgZIncgLzG2fymmKHwNvxi91K53gR9reowWV28VuqloztzjJJ8z7UFFcajdkKmAx7cljXq00ywnjkv767k+IJeYxj9c5pj/ABu1t1+Hpts0kvbPdhTalj+5sCI2gLwi5P8AU8Q9P6i2JLrUHgTufFz9BXmWN7Zv5cjSx/8Adya8RyanfXG65DLH5r/mjZgI48k4FOVqpXIzAFnDYYg+kE+YTZvb7GgZZfnLoHGVTnFD6jebWKKefSi+no9wkeTnB7Ghlt77IfZ4aGyUNrbn5XDcnHNJnjUSMMr3NFaprS2EXhG+Q9lB4HuajXvbh3ZzIcsSTitai9EwsHpdPY+WPAM0/TrlVZNzlFHcgZqYkkI64aRINpE8gJJ5/L6fc/WqLRublc1LTsf+ok3J5vjnn3NQhLInXryYtqcKAkIYkbbtVRnaOeOfvzUhmrj8R4Yor2yMcSIWhBYqoGeB3qHrSdTTdxppt7HvFvdNtjfgv6frWg6Lo9tpDgu0ciTLvjkHYisqqq02aU6FCDI5CyMFBY8D2pqlyWAMR1dCvSw6lhrOs2tsmPB4hzio2+1tHjZUwznyHlSzUnZlGWJ58zQtuBszjnNMnUvjaItpdFWibu5+AaWQu/cmjBqDwRGKE7T3ZhQkpxnHtXyyAa9iBAI3Dg0IMV4EeKhhkxnDpN3fxmVjtRudz9zQDQWqsVy5wcZx3q7nAW0bAxhPKoaSWQSuBI4AY4ANGvqVMRPT3tZnPU//2Q=='
      }];

      $scope.startPauseClass    = ['glyphicon glyphicon-play','glyphicon glyphicon-pause'];
      $scope.startBtnPauseClass = ['btn-xs btn btn-primary','btn-xs btn btn-warning'];
      $scope.timerRunning = true;
      $scope.bet = 1000;
      $scope.currentPlayer = $scope.me;
      $scope.playing = 1;
      


      $scope.startTimer = function (){
        $scope.$broadcast('timer-start');
        $scope.timerRunning = true;
      };

      $scope.stopTimer = function (){
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };

      $scope.$on('timer-stopped', function (event, data){
        //console.log('Timer Stopped - event/data = ', event, data);
        //console.log('event.targetScope.countdown',event.currentScope);
        if(event.targetScope.countdown === 0){
          $scope.$emit('next-player');
        } 
      });

      $scope.$on('next-player', function (event, data){
        $scope.currentPlayer = 1- $scope.currentPlayer;
        elementPlayCountdown.start();
        $scope.$apply();
      });

      $scope.startPausePlay = function(){
        $scope.playing = 1 - $scope.playing;
        if($scope.playing){
          elementPlayCountdown.start();
        }else{
          elementPlayCountdown.stop();
        } 
      };
    });

};

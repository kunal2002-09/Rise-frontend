
import css from 'styled-jsx/css';
export default css`
  @import 'src/public/styles/variables';
  @import 'src/public/styles/mixins/mixins';
  .navbarWrapper{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.logoWrapper{
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
}
.logoImg{
    font-size: 20px;
    font-weight: bold;
}
.buttonSection{
    display: flex;
    gap: 10px;
}
.buttonWrapper{
    display: flex;
    gap: 10px;
}
`
import styled from 'styled-components'

export const ButtonContainer = styled.button`
    text-transform: capitalize;
    font-size: 1.4rem;
    background: transparent;
    border: 0.05rem solid var(--lightBlue);
    border-color: 'var(--lightBlue)';
    color: var(--lightBlue);
    border-radius: 0.5rem;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    margin: 0.2rem 0.5rem 0.2rem 0;
    transition:all 0.5s ease-in-out;
&:hover{
    background: var(--lightBlue);
    color: var(--mainBlue);
}
&:focus{
    outline: none;
}
`;

export const ProductWrapper = styled.div`
  .card{
    border-color: transparent;
    transition: all 1s linear;
    border-radius: 2rem;
    overflow: hidden;
  }
  
  .card-footer{
    background: transparent;
    border-top: transparent;
    transition: all .8s linear;
  }
  
  &:hover{
    .card{
      border: 0.1rem solid rgba(0,0,0,0.2);
      box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.2);
    }
    
    .card-footer{
      background: rgba(220,220,220);
    }
  }
  
  .img-container{
    position: relative;
    overflow: hidden;
  }
  
  .card-img-top{
    transition: all .5s linear;
  }
    
  .img-container:hover .card-img-top{
    transform: scale(1.2) !important;
  }
  
  .cart-btn{
    position: absolute;
    bottom: 0;
    right: 0;
    padding: .2rem .4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
    font-size: 1.4rem;
    border-radius: 0.5rem 0 0 0;
    transform: translate(100%,100%);
    transition: all .5s linear;
  }
  
  .img-container:hover .cart-btn{
    transform: translate(0,0);
  }
  
  .cart-btn:hover{
    color: var(--mainBlue);
    cursor: pointer;
  }
`;

export const FootWrapper = styled.div`
.footer {
    background-color: #40474e;
}

.footer img {
    height: 9rem;
    margin: 1.5rem 0;
    border-radius: 2rem;
}

.footer i{
    margin: 0 6px;
}

.footer i:hover {
    color: #99f8f3 !important;
}

.hr {
    width: 100%;
    border-top: .5px solid white;
    margin-top: 3rem;
}
`;

export const NavWrapper = styled.nav`
.nav-link{
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize;
}
`;
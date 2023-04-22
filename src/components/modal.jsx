import { useEffect } from 'react';
import css from './css/modal.module.css';

export function Modal(props) {
  useEffect(() => {
    const onClickEsc = e => {
      if (e.key === 'Escape') {
        props.modal({ showModal: false });
      }
    };

    const onClickModal = e => {
      const modal = document.querySelector('#modal');
      if (e.target === modal) {
        modal.style.display = 'none';
        props.modal({ showModal: false });
      }
    };

    window.addEventListener('keydown', onClickEsc);
    window.addEventListener('click', onClickModal);

    return () => {
      window.removeEventListener('keydown', onClickEsc);
      window.removeEventListener('click', onClickModal);
    };
  }, [props]);

  const { getLargeImg } = props;

  return (
    <div className={css.overlay} id="modal">
      <div className={css.modal}>
        <img src={getLargeImg} alt="" />
      </div>
    </div>
  );
}

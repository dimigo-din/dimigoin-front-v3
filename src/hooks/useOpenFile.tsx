import React, { useRef } from 'react';

const useOpenFile = () => {
  const element = useRef<HTMLInputElement | null>();

  return {
    InputElement: (
      props: React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
      >,
    ) => <input {...props} type="file" ref={(r) => (element.current = r)} />,
    getFileContent: () =>
      new Promise((success, fail) => {
        const input = element.current;
        if (!input) return fail('INTANCE_NOT_CREATED');
        const callback = async () => {
          input.removeEventListener('change', callback);
          if (!input.files) return fail('NO_SELECTED_FILES');
          const buffers = await Promise.all(
            [...input.files]?.map((e) => e.arrayBuffer()),
          );
          success(buffers);
        };
        input.addEventListener('change', callback);
        input.click();
      }),
  };
};

export default useOpenFile;

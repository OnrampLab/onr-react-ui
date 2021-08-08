import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading2';

export const LoadingPage = () => {
  return (
    <div className="flex w-full h-full flex-wrap content-center justify-center">
      <UseAnimations animation={loading} size={40} pathCss="fill: #36D7B7" />
    </div>
  );
};

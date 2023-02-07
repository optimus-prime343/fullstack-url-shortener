import LoadingImage from '../../../assets/images/loading.png'
import { AppText } from '../../ui/app-text'
export const LoadingView = () => {
  return (
    <div class='flex min-h-screen flex-col items-center justify-center gap-2'>
      <img class='h-48' src={LoadingImage} />
      <AppText intent='title'>Loading</AppText>
      <AppText intent='body'>Please wait.......</AppText>
    </div>
  )
}

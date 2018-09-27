import DrawerMultiChild from './DrawerMultiChild'
import { Config } from '@common'
export default (Config.menu.isMultiChild ? DrawerMultiChild : DrawerDefault)